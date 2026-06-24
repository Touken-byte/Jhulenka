# Guía de Pruebas del Sistema de Biblioteca

## Introducción
Esta guía detalla cómo probar todas las funcionalidades del Sprint 1 del Sistema Inteligente de Gestión de Biblioteca.

## Configuración Inicial

### 1. Iniciar el Sistema
```bash
# Método 1: Usar el script de inicio (Windows)
start.bat

# Método 2: Manual
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Acceder al Sistema
- Abrir navegador en: `http://localhost:5000`
- Credenciales de administrador:
  - Correo: `admin@biblioteca.com`
  - Carnet: `ADMIN001`

## Pruebas Paso a Paso

### PRUEBA 1: Registro de Usuario (IN-A01)

**Objetivo**: Verificar el registro y validación de usuarios.

**Pasos**:
1. En la página de login, hacer clic en "Regístrate aquí"
2. Completar el formulario:
   - Nombre: "Juan"
   - Apellido: "Pérez"
   - Carnet: "LEC001"
   - Correo: "juan.perez@email.com"
   - Tipo de usuario: "LECTOR"
3. Hacer clic en "Registrar"
4. Verificar mensaje de éxito
5. Intentar registrar con datos inválidos para probar validaciones:
   - Carnet duplicado
   - Correo inválido
   - Campos vacíos

**Resultados Esperados**:
- ✅ Usuario registrado exitosamente
- ✅ Validación de campos obligatorios
- ✅ Validación de unicidad de carnet y correo
- ✅ Validación de formato de correo
- ✅ Redirección automática al login

### PRUEBA 2: Inicio de Sesión

**Objetivo**: Verificar autenticación de usuarios.

**Pasos**:
1. Ingresar credenciales de administrador
2. Verificar acceso al panel principal
3. Cerrar sesión
4. Ingresar credenciales de usuario lector (si se registró)
5. Verificar acceso con permisos limitados

**Resultados Esperados**:
- ✅ Login exitoso con credenciales correctas
- ✅ Mensaje de error con credenciales incorrectas
- ✅ Redirección al panel principal
- ✅ Diferenciación de roles (admin vs lector)

### PRUEBA 3: Gestión de Catálogo (IN-A02)

**Objetivo**: Verificar registro y consulta de libros.

**Pasos**:
1. Como administrador, ir a sección "Libros"
2. Hacer clic en "+ Nuevo Libro"
3. Completar formulario:
   - Título: "Aprendiendo Python"
   - Autor: "Mark Lutz"
   - Editorial: "O'Reilly"
   - ISBN: "978-0596158101"
   - Categoría: "Tecnología"
   - Año: 2020
   - Ejemplares totales: 3
   - Ejemplares disponibles: 3
4. Guardar libro
5. Verificar que aparezca en el catálogo
6. Probar filtros de búsqueda:
   - Por título: "Python"
   - Por autor: "Lutz"
   - Por categoría: "Tecnología"
   - Solo disponibles: marcar checkbox
7. Hacer clic en el libro para ver detalles

**Resultados Esperados**:
- ✅ Libro registrado exitosamente
- ✅ Validación de campos obligatorios
- ✅ Validación de ISBN único
- ✅ Filtros de búsqueda funcionando
- ✅ Detalle de libro mostrando toda la información

### PRUEBA 4: Préstamo de Ejemplares (IN-U02)

**Objetivo**: Verificar proceso de préstamo de libros.

**Pasos**:
1. Como administrador, ir a sección "Préstamos"
2. Hacer clic en "+ Nuevo Préstamo"
3. Seleccionar usuario (el lector registrado en prueba 1)
4. Seleccionar libro (cualquier libro disponible)
5. Establecer días de préstamo: 14
6. Guardar préstamo
7. Verificar que el préstamo aparezca en la lista
8. Ir a sección "Libros" y verificar que el stock disminuyó

**Resultados Esperados**:
- ✅ Préstamo registrado exitosamente
- ✅ Stock del libro disminuido correctamente
- ✅ Fecha de vencimiento calculada automáticamente
- ✅ Solo administradores pueden crear préstamos
- ✅ No se puede prestar si no hay disponibilidad

### PRUEBA 5: Devolución y Cálculo de Retraso (IN-U03)

**Objetivo**: Verificar proceso de devolución y cálculo de multas.

**Pasos**:
1. Como administrador, ir a sección "Préstamos"
2. En un préstamo activo, hacer clic en "Devolver"
3. Confirmar la devolución
4. Verificar que el préstamo cambie a estado "DEVUELTO"
5. Ir a sección "Libros" y verificar que el stock aumentó
6. Para probar retraso:
   - Modificar manualmente la fecha de vencimiento a una fecha pasada
   - Realizar la devolución
   - Verificar que se genere multa por retraso

**Resultados Esperados**:
- ✅ Devolución registrada exitosamente
- ✅ Stock del libro restaurado
- ✅ Cálculo automático de días de retraso
- ✅ Generación de multa cuando corresponde
- ✅ Estado del préstamo actualizado

### PRUEBA 6: Reservas de Libros (IN-U05)

**Objetivo**: Verificar sistema de reservas.

**Pasos**:
1. Como usuario lector, ir a sección "Libros"
2. Hacer clic en un libro disponible
3. En el detalle, hacer clic en "Reservar Libro"
4. Verificar mensaje de éxito
5. Ir a sección "Reservas"
6. Verificar que la reserva aparezca en la lista
7. Cancelar la reserva
8. Verificar que se elimine de la lista

**Resultados Esperados**:
- ✅ Reserva creada exitosamente
- ✅ Reserva aparece en lista de reservas
- ✅ Posición en lista de espera correcta
- ✅ Cancelación de reserva exitosa
- ✅ No se puede reservar libro no disponible

### PRUEBA 7: Panel de Control (Dashboard)

**Objetivo**: Verificar estadísticas del sistema.

**Pasos**:
1. Como administrador, ir a sección "Inicio"
2. Verificar estadísticas:
   - Total de libros
   - Usuarios activos
   - Préstamos activos
   - Reservas activas
3. Verificar sección "Libros Más Prestados"
4. Realizar operaciones (préstamos, devoluciones, etc.)
5. Actualizar página y verificar que estadísticas se actualicen

**Resultados Esperados**:
- ✅ Estadísticas mostradas correctamente
- ✅ Números actualizados después de operaciones
- ✅ Solo administradores ven estadísticas completas
- ✅ Gráficos o listas de libros más prestados

### PRUEBA 8: Gestión de Usuarios (Solo Admin)

**Objetivo**: Verificar administración de usuarios.

**Pasos**:
1. Como administrador, ir a sección "Usuarios"
2. Verificar que aparezcan todos los usuarios
3. Hacer clic en "Editar" en un usuario
4. Modificar datos (ej: cambiar estado a INACTIVO)
5. Guardar cambios
6. Verificar que los cambios se reflejen

**Resultados Esperados**:
- ✅ Lista de usuarios mostrada correctamente
- ✅ Edición de usuarios exitosa
- ✅ Cambio de estado de usuario
- ✅ Solo administradores pueden gestionar usuarios

## Pruebas de Validación y Errores

### Validación de Campos Obligatorios
- Intentar registrar libro sin título → Error
- Intentar registrar usuario sin carnet → Error
- Intentar crear préstamo sin seleccionar usuario → Error

### Validación de Datos Únicos
- Registrar usuario con carnet duplicado → Error
- Registrar libro con ISBN duplicado → Error
- Registrar usuario con correo duplicado → Error

### Validación de Permisos
- Usuario lector intenta acceder a panel de administración → Error/Redirección
- Usuario no autenticado intenta acceder a API → Error 401

### Validación de Reglas de Negocio
- Intentar prestar libro sin disponibilidad → Error
- Intentar reservar libro ya reservado por el mismo usuario → Error
- Intentar devolver préstamo ya devuelto → Error

## Pruebas de Integración

### Flujo Completo de Préstamo
1. Registrar usuario lector
2. Registrar libro
3. Iniciar sesión como administrador
4. Crear préstamo para el usuario
5. Verificar stock disminuido
6. Devolver libro
7. Verificar stock restaurado
8. Verificar historial de préstamos

### Flujo Completo de Reserva
1. Registrar usuario lector
2. Iniciar sesión como lector
3. Reservar libro disponible
4. Verificar reserva en lista
5. Cancelar reserva
6. Verificar que se liberó el cupo

## Pruebas de Rendimiento

### Carga de Datos
- Cargar 100 libros y verificar tiempo de respuesta
- Realizar 50 préstamos simultáneos (simulados)
- Verificar que el sistema no se bloquee

### Búsquedas
- Realizar búsquedas con múltiples filtros
- Verificar tiempo de respuesta de búsquedas
- Verificar que resultados sean correctos

## Pruebas de Seguridad

### Autenticación
- Intentar acceder sin token JWT → Error 401
- Usar token expirado → Error 401
- Usar token inválido → Error 401

### Autorización
- Usuario lector intenta acceder a endpoints de admin → Error 403
- Usuario inactivo intenta hacer login → Error 403

### Validación de Datos
- Enviar datos maliciosos en formularios → Error de validación
- Intentar inyección SQL → Error de validación
- Enviar datos en formato incorrecto → Error 400

## Reporte de Errores

Si encuentras errores durante las pruebas, reporta:

1. **Descripción del Error**: Qué sucedió
2. **Pasos para Reproducir**: Cómo llegar al error
3. **Comportamiento Esperado**: Qué debería haber pasado
4. **Capturas de Pantalla**: Si es relevante
5. **Navegador y Sistema Operativo**: Información del entorno

## Criterios de Aceptación

El sistema se considera aprobado si:

- ✅ Todas las pruebas principales pasan
- ✅ No hay errores críticos en producción
- ✅ La interfaz es responsiva y usable
- ✅ Los datos se persisten correctamente
- ✅ Las validaciones funcionan correctamente
- ✅ El rendimiento es aceptable
- ✅ La seguridad básica está implementada

## Notas Importantes

1. **Base de Datos de Prueba**: El sistema incluye datos de ejemplo para facilitar las pruebas.
2. **Reiniciar Sistema**: Si necesitas reiniciar, elimina el archivo `biblioteca.db` y reinicia el servidor.
3. **Navegadores Soportados**: Chrome, Firefox, Edge, Safari (versiones recientes).
4. **Resolución Mínima**: 1024x768 píxeles para mejor experiencia.

## Contacto para Soporte

Para reportar errores o solicitar ayuda:
- Revisar logs del servidor Flask
- Verificar consola del navegador (F12)
- Consultar documentación en README.md

---

**Fecha de Última Actualización**: 20/04/2026
**Versión del Sistema**: 1.0.0 (Sprint 1)