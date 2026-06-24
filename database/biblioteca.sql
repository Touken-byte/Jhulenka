-- Base de datos para Sistema Inteligente de Gestión de Biblioteca
-- Sprint 1: Usuarios, Catálogo, Préstamos, Devoluciones y Reservas

-- Eliminar tablas si existen (para desarrollo)
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS multas;
DROP TABLE IF EXISTS devoluciones;
DROP TABLE IF EXISTS prestamos;
DROP TABLE IF EXISTS libros;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

-- Crear tabla de categorías
CREATE TABLE categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'ACTIVA' CHECK(estado IN ('ACTIVA', 'INACTIVA'))
);

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    carnet VARCHAR(20) NOT NULL UNIQUE,
    correo VARCHAR(150) NOT NULL UNIQUE,
    tipo_usuario VARCHAR(30) NOT NULL CHECK(tipo_usuario IN ('ADMINISTRADOR', 'LECTOR')),
    estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK(estado IN ('ACTIVO', 'INACTIVO')),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de libros
CREATE TABLE libros (
    id_libro INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    editorial VARCHAR(100),
    isbn VARCHAR(20) UNIQUE,
    id_categoria INTEGER,
    anio_publicacion INTEGER,
    ejemplares_totales INTEGER DEFAULT 1,
    ejemplares_disponibles INTEGER DEFAULT 1,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK(estado IN ('ACTIVO', 'INACTIVO')),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Crear tabla de préstamos
CREATE TABLE prestamos (
    id_prestamo INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_libro INTEGER NOT NULL,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE NOT NULL,
    fecha_devolucion DATE,
    estado VARCHAR(30) DEFAULT 'PRESTADO' CHECK(estado IN ('PRESTADO', 'DEVUELTO', 'RETRASADO')),
    creado_por INTEGER, -- ID del bibliotecario que realizó el préstamo
    ci_prenda VARCHAR(20),
    ru_prenda VARCHAR(20),
    celular VARCHAR(20),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro),
    FOREIGN KEY (creado_por) REFERENCES usuarios(id_usuario)
);

-- Crear tabla de devoluciones
CREATE TABLE devoluciones (
    id_devolucion INTEGER PRIMARY KEY AUTOINCREMENT,
    id_prestamo INTEGER NOT NULL,
    fecha_devolucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dias_retraso INTEGER DEFAULT 0,
    multa_generada DECIMAL(10,2) DEFAULT 0.00,
    estado_multa VARCHAR(20) DEFAULT 'PENDIENTE' CHECK(estado_multa IN ('PENDIENTE', 'PAGADA')),
    FOREIGN KEY (id_prestamo) REFERENCES prestamos(id_prestamo)
);

-- Crear tabla de reservas
CREATE TABLE reservas (
    id_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_libro INTEGER NOT NULL,
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(30) DEFAULT 'ACTIVA' CHECK(estado IN ('ACTIVA', 'COMPLETADA', 'CANCELADA')),
    posicion_lista INTEGER DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_libros_categoria ON libros(id_categoria);
CREATE INDEX idx_libros_isbn ON libros(isbn);
CREATE INDEX idx_prestamos_usuario ON prestamos(id_usuario);
CREATE INDEX idx_prestamos_libro ON prestamos(id_libro);
CREATE INDEX idx_prestamos_estado ON prestamos(estado);
CREATE INDEX idx_devoluciones_prestamo ON devoluciones(id_prestamo);
CREATE INDEX idx_reservas_usuario ON reservas(id_usuario);
CREATE INDEX idx_reservas_libro ON reservas(id_libro);

-- Insertar datos de ejemplo para categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Ficción', 'Literatura de ficción general'),
('Ciencia Ficción', 'Novelas de ciencia ficción y fantasía'),
('Tecnología', 'Libros sobre tecnología y programación'),
('Educación', 'Material educativo y académico'),
('Historia', 'Libros de historia y biografías'),
('Matemáticas', 'Textos de matemáticas y lógica');

-- Insertar usuario administrador de ejemplo
INSERT INTO usuarios (nombre, apellido, carnet, correo, tipo_usuario, estado) VALUES
('Admin', 'Biblioteca', 'ADMIN001', 'admin@biblioteca.com', 'ADMINISTRADOR', 'ACTIVO');

-- Insertar libros de ejemplo
INSERT INTO libros (titulo, autor, editorial, isbn, id_categoria, anio_publicacion, ejemplares_totales, ejemplares_disponibles, descripcion) VALUES
('Fundamentos de Programación', 'Luis Joyanes', 'McGraw-Hill', '978-9701072450', 3, 2020, 5, 5, 'Libro básico de programación'),
('Matemáticas Discretas', 'Richard Johnsonbaugh', 'Pearson', '978-6073220586', 6, 2019, 3, 3, 'Matemáticas para ciencias de la computación'),
('Historia Universal', 'José Luis Esquivel', 'Editorial Patria', '978-6075320123', 5, 2021, 2, 2, 'Historia general de la humanidad'),
('Introducción a la Física', 'Paul Tipler', 'Editorial Reverté', '978-8429144295', 4, 2018, 4, 4, 'Física básica para estudiantes'),
('El Señor de los Anillos', 'J.R.R. Tolkien', 'Minotauro', '978-9877380789', 2, 2020, 3, 3, 'Trilogía de fantasía épica');

-- Función para calcular días de retraso
CREATE TRIGGER IF NOT EXISTS calcular_retraso_devolucion
AFTER UPDATE OF fecha_devolucion ON prestamos
FOR EACH ROW
WHEN NEW.fecha_devolucion IS NOT NULL AND NEW.estado = 'DEVUELTO'
BEGIN
    INSERT INTO devoluciones (id_prestamo, fecha_devolucion, dias_retraso, multa_generada)
    SELECT 
        NEW.id_prestamo,
        NEW.fecha_devolucion,
        MAX(0, julianday(NEW.fecha_devolucion) - julianday(NEW.fecha_vencimiento)),
        MAX(0, julianday(NEW.fecha_devolucion) - julianday(NEW.fecha_vencimiento)) * 1.0
    WHERE NEW.fecha_devolucion > NEW.fecha_vencimiento;
    
    -- Actualizar disponibilidad del libro
    UPDATE libros SET ejemplares_disponibles = ejemplares_disponibles + 1 
    WHERE id_libro = NEW.id_libro;
END;

-- Función para actualizar disponibilidad al realizar préstamo
CREATE TRIGGER IF NOT EXISTS actualizar_disponibilidad_prestamo
AFTER INSERT ON prestamos
FOR EACH ROW
BEGIN
    UPDATE libros SET ejemplares_disponibles = ejemplares_disponibles - 1 
    WHERE id_libro = NEW.id_libro;
END;

-- Función para manejar reservas al completarse un préstamo
CREATE TRIGGER IF NOT EXISTS manejar_reservas_completadas
AFTER UPDATE OF estado ON prestamos
FOR EACH ROW
WHEN NEW.estado = 'DEVUELTO'
BEGIN
    -- Buscar la próxima reserva activa para este libro
    UPDATE reservas SET estado = 'COMPLETADA', posicion_lista = 0
    WHERE id_reserva = (
        SELECT id_reserva 
        FROM reservas 
        WHERE id_libro = NEW.id_libro 
        AND estado = 'ACTIVA'
        ORDER BY posicion_lista ASC
        LIMIT 1
    );
END;

-- Vista para consultar préstamos activos
CREATE VIEW IF NOT EXISTS vista_prestamos_activos AS
SELECT 
    p.id_prestamo,
    u.nombre || ' ' || u.apellido AS usuario,
    l.titulo AS libro,
    p.fecha_prestamo,
    p.fecha_vencimiento,
    p.estado,
    CASE 
        WHEN p.fecha_vencimiento < DATE('now') AND p.estado = 'PRESTADO' 
        THEN 'RETRASADO' 
        ELSE 'AL DIA' 
    END AS estado_prestamo
FROM prestamos p
JOIN usuarios u ON p.id_usuario = u.id_usuario
JOIN libros l ON p.id_libro = l.id_libro
WHERE p.estado = 'PRESTADO';

-- Vista para consultar disponibilidad de libros
CREATE VIEW IF NOT EXISTS vista_disponibilidad_libros AS
SELECT 
    l.id_libro,
    l.titulo,
    l.autor,
    c.nombre AS categoria,
    l.ejemplares_totales,
    l.ejemplares_disponibles,
    CASE 
        WHEN l.ejemplares_disponibles > 0 THEN 'DISPONIBLE'
        ELSE 'NO DISPONIBLE'
    END AS estado_disponibilidad
FROM libros l
LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
WHERE l.estado = 'ACTIVO';

-- Vista para consultar reservas activas
CREATE VIEW IF NOT EXISTS vista_reservas_activas AS
SELECT 
    r.id_reserva,
    u.nombre || ' ' || u.apellido AS usuario,
    l.titulo AS libro,
    c.nombre AS categoria,
    r.fecha_reserva,
    r.posicion_lista,
    r.estado
FROM reservas r
JOIN usuarios u ON r.id_usuario = u.id_usuario
JOIN libros l ON r.id_libro = l.id_libro
LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
WHERE r.estado = 'ACTIVA'
ORDER BY r.fecha_reserva, r.posicion_lista;