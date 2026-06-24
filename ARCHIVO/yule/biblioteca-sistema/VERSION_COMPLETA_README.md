# Sistema Inteligente de Gestión de Biblioteca - Versión Completa

## 🎯 Características Principales

### ✅ Funcionalidades Implementadas

1. **Gestión de Usuarios**
   - Registro de usuarios con validación de datos
   - Autenticación por correo y carnet
   - Roles: Administrador y Lector
   - Gestión de usuarios (CRUD) - Solo administradores

2. **Catálogo de Libros**
   - Más de 150 libros precargados en 15 categorías
   - Búsqueda por título, autor, categoría
   - Filtro de disponibilidad
   - Visualización detallada de libros
   - CRUD de libros - Solo administradores

3. **Sistema de Préstamos**
   - Registro automático de fecha de préstamo
   - Cálculo automático de fecha de vencimiento
   - Días de préstamo configurables (1-30 días)
   - Estado de préstamos: PRESTADO / DEVUELTO
   - Filtrado por estado

4. **Sistema de Devoluciones**
   - Registro de devoluciones
   - Cálculo automático de días de retraso
   - Generación automática de multas (Bs. 1.00 por día)
   - Estados de multa: PENDIENTE / PAGADA

5. **Sistema de Reservas**
   - Reservas de libros no disponibles
   - Sistema de cola (posición en lista)
   - Estados: ACTIVA / CANCELADA
   - Solo usuarios registrados pueden reservar

6. **Dashboard**
   - Estadísticas en tiempo real
   - Libros más prestados (solo administradores)
   - Tarjetas con totales

### 📚 Categorías de Libros (150 libros)

1. Ficción (10 libros)
2. Ciencia Ficción (10 libros)
3. Tecnología (10 libros)
4. Educación (10 libros)
5. Historia (10 libros)
6. Matemáticas (10 libros)
7. Física (10 libros)
8. Química (10 libros)
9. Biología (10 libros)
10. Literatura (10 libros)
11. Filosofía (10 libros)
12. Psicología (10 libros)
13. Economía (10 libros)
14. Derecho (10 libros)
15. Medicina (10 libros)

## 🚀 Cómo Usar

### 1. Abrir el Sistema

```bash
# Método 1: Abrir directamente en el navegador
# Ir a: biblioteca-sistema/frontend/sistema-completo-final.html

# Método 2: Usar el archivo batch
# Ejecutar: biblioteca-sistema/frontend/ABRIR_SISTEMA.bat
```

### 2. Iniciar Sesión

**Administrador por defecto:**
- Correo: `admin@biblioteca.com`
- Carnet: `ADMIN001`

### 3. Registro de Nuevos Usuarios

- Hacer clic en "Regístrate aquí"
- Completar todos los campos requeridos
- Seleccionar tipo de usuario (LECTOR o ADMINISTRADOR)

### 4. Funcionalidades por Rol

#### Lector
- Ver catálogo de libros
- Buscar y filtrar libros
- Reservar libros disponibles
- Ver sus reservas activas
- Cancelar reservas

#### Administrador
- Todas las funciones de Lector +
- Agregar, editar y eliminar libros
- Registrar préstamos
- Registrar devoluciones
- Gestionar usuarios
- Ver dashboard completo

## 💾 Almacenamiento de Datos

El sistema utiliza **localStorage** del navegador para almacenar:
- Usuarios
- Libros
- Préstamos
- Devoluciones
- Reservas
- Categorías

**Importante:** Los datos persisten en el navegador pero se pierden si se limpia el caché.

## 📋 Estructura de Archivos

```
biblioteca-sistema/
├── frontend/
│   ├── sistema-completo-final.html    # Versión completa del sistema
│   ├── js/
│   │   └── sistema-completo.js        # Lógica del sistema
│   ├── css/
│   │   └── styles.css                 # Estilos base
│   └── ABRIR_SISTEMA.bat              # Acceso directo
└── VERSION_COMPLETA_README.md         # Este archivo
```

## 🎨 Diseño y UX

- **Diseño Responsivo:** Se adapta a diferentes tamaños de pantalla
- **Tema Oscuro:** Interfaz moderna y agradable
- **Iconos:** Font Awesome 6.4.0
- **Animaciones:** Transiciones suaves y efectos hover
- **Notificaciones:** Toast messages para feedback

## 🔧 Características Técnicas

### Validaciones
- Campos requeridos
- ISBN duplicado
- Carnet duplicado
- Correo duplicado
- Disponibilidad de libros
- Estado de usuario activo

### Fechas Automáticas
- Fecha de préstamo: momento actual
- Fecha de vencimiento: calculada según días de préstamo
- Fecha de devolución: momento de la devolución

### Cálculos Automáticos
- Días de retraso: diferencia entre fecha actual y vencimiento
- Multa: días de retraso × Bs. 1.00
- Posición en lista de reservas: número de reservas activas + 1

## 📊 Estadísticas

El dashboard muestra:
- Total de libros
- Usuarios activos
- Préstamos activos
- Reservas activas
- Libros más prestados (top 5)

## 🔐 Seguridad

- Autenticación por correo y carnet
- Validación de sesión activa
- Control de acceso por roles
- Protección contra acciones no autorizadas

## 📝 Notas Importantes

1. **Datos de Prueba:** El sistema incluye 150 libros precargados y un administrador por defecto
2. **Persistencia:** Los datos se guardan en localStorage del navegador
3. **Sin Backend:** Esta versión funciona completamente en el frontend
4. **Compatible:** Funciona en todos los navegadores modernos

## 🛠️ Desarrollo Futuro

Posibles mejoras:
- Backend con base de datos real
- Sistema de notificaciones por email
- Reportes en PDF/Excel
- Historial completo de préstamos
- Sistema de recomendaciones
- Búsqueda avanzada
- Pagos en línea de multas

## 📞 Soporte

Para problemas o sugerencias, revisar:
- `biblioteca-sistema/README.md` - Documentación general
- `biblioteca-sistema/TESTING_GUIDE.md` - Guía de pruebas
- `biblioteca-sistema/SPRINT_1_SUMMARY.md` - Resumen del sprint

---

**Versión:** 1.0.0 - Sprint 1 Completo
**Última Actualización:** 21/04/2026
**Estado:** ✅ Completado