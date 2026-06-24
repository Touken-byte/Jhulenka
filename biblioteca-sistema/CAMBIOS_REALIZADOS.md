# Cambios Realizados en el Sistema de Biblioteca

## 📋 Resumen de Modificaciones

Se han implementado las siguientes mejoras y restricciones en el sistema:

### 1. 🎨 Diseño del Login con Escudo Universitario

**Archivos modificados:**
- `frontend/index.html`
- `frontend/css/styles.css`

**Cambios:**
- Se agregó un contenedor para el escudo de la universidad en la sección de login
- El login ahora muestra un ícono de universidad (o el escudo si existe el archivo)
- Se mejoró el diseño visual con gradientes y efectos especiales

**Para agregar el escudo:**
1. Coloca tu archivo de escudo en: `frontend/imagenes/escudo.png`
2. El sistema mostrará automáticamente la imagen si existe
3. Si no existe, mostrará un ícono de universidad como respaldo

### 2. 🔒 Restricción de Registro de Usuarios

**Archivos modificados:**
- `frontend/index.html`
- `frontend/js/app-local.js`

**Cambios:**
- Los usuarios que se registran por su cuenta **SOLO** pueden registrarse como **LECTOR**
- El campo "Tipo de Usuario" ahora está deshabilitado y fijo en "LECTOR"
- Se agregó un mensaje informativo: "* Solo los administradores pueden crear cuentas de administrador"
- **Únicamente** un administrador puede crear nuevos administradores desde la sección de gestión de usuarios

**Comportamiento:**
- ✅ Un usuario normal puede registrarse como LECTOR
- ❌ Un usuario normal NO puede registrarse como ADMINISTRADOR
- ✅ Un ADMINISTRADOR puede crear/editar usuarios y asignar cualquier tipo

### 3. 📝 Control de Préstamos con CI y RU como Prenda

**Archivos modificados:**
- `frontend/index.html`
- `frontend/js/app-local.js`
- `frontend/css/styles.css`

**Cambios:**
- Se agregó una sección especial en el formulario de préstamos para registrar la prenda
- El administrador debe ingresar:
  - Número de CI (Carnet de Identidad) del usuario
  - Número de RU (Registro Universitario) del usuario
  - Confirmar que ha recibido físicamente ambos documentos
- Los campos de prenda se guardan junto con el préstamo
- Se muestra un mensaje de advertencia visualmente destacado

**Flujo de préstamo:**
1. El administrador selecciona el usuario y el libro
2. Ingresa los días de préstamo
3. **Debe** registrar el CI y RU que recibe como prenda
4. **Debe** confirmar que recibió los documentos físicos
5. El sistema registra el préstamo con toda la información

**Importante:**
- Sin la confirmación de la prenda, no se puede completar el préstamo
- Los datos de CI y RU quedan registrados en el préstamo para su seguimiento

## 🚀 Cómo Usar el Sistema Actualizado

### Para Usuarios (Lectores):
1. Ir a la página de login
2. Hacer clic en "Regístrate aquí"
3. Llenar el formulario (automáticamente serás registrado como LECTOR)
4. Iniciar sesión con correo y carnet

### Para Administradores:
1. Iniciar sesión con credenciales de administrador
2. Acceder a la sección "Usuarios" en el menú
3. Crear nuevos usuarios (puede asignar tipo ADMINISTRADOR o LECTOR)
4. Para préstamos:
   - Ir a sección "Préstamos"
   - Click en "Nuevo Préstamo"
   - Completar todos los campos incluyendo CI y RU de prenda
   - Confirmar recepción de documentos

## 📁 Estructura de Archivos

```
biblioteca-sistema/
├── frontend/
│   ├── imagenes/
│   │   └── escudo.png          (Agregar tu escudo aquí)
│   ├── index.html              (Modificado)
│   ├── css/
│   │   └── styles.css          (Modificado)
│   └── js/
│       └── app-local.js        (Modificado)
└── CAMBIOS_REALIZADOS.md       (Este archivo)
```

## ⚠️ Notas Importantes

1. **Escudo de la Universidad:**
   - El sistema busca `imagenes/escudo.png`
   - Si no existe, muestra un ícono de universidad
   - Recomendado: 100x100px o similar, formato PNG

2. **Seguridad:**
   - Los usuarios registrados por sí mismos siempre son LECTORES
   - Solo administradores existentes pueden crear nuevos administradores
   - Esto previene que usuarios no autorizados obtengan privilegios de administrador

3. **Préstamos:**
   - El sistema ahora requiere obligatoriamente registrar CI y RU
   - Esto ayuda a llevar un control más estricto de los préstamos
   - Los datos quedan almacenados para auditoría

## 🔄 Próximas Mejoras Sugeridas

- [ ] Agregar funcionalidad para devolver CI/RU cuando se devuelve el libro
- [ ] Mostrar historial de prendas por usuario
- [ ] Agregar validación de formato para CI y RU
- [ ] Exportar reporte de prendas pendientes de devolución

## 📞 Soporte

Si tienes problemas con el escudo de la universidad:
1. Verifica que el archivo esté en `frontend/imagenes/escudo.png`
2. Verifica que el nombre sea exactamente "escudo.png" (minúsculas)
3. Limpia el caché del navegador si es necesario

---

**Fecha de actualización:** 29/04/2026  
**Versión:** 1.1.0