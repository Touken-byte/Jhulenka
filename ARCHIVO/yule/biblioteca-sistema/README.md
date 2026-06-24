# Sistema Inteligente de Gestión de Biblioteca

## 📚 Descripción
Sistema de gestión de biblioteca con frontend moderno en dark theme y backend API REST.

## 🚀 Inicio Rápido

### Requisitos
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Instalación
1. Abre una terminal o CMD
2. Navega al directorio del proyecto
3. Ejecuta el script de inicio:

```bash
# Windows
INICIAR_SISTEMA.bat

# Linux/Mac
./INICIAR_SISTEMA.sh
```

### Credenciales de Administrador
- **Correo**: admin@biblioteca.com
- **Carnet**: ADMIN001

## 🏗️ Estructura del Proyecto

```
biblioteca-sistema/
├── backend/
│   ├── app.py              # API Flask
│   └── requirements.txt    # Dependencias
├── frontend/
│   ├── index.html          # Interfaz principal
│   ├── css/
│   │   └── styles.css      # Estilos dark theme
│   ├── js/
│   │   └── app.js          # Lógica frontend
│   └── ABRIR_SISTEMA.bat   # Script de inicio rápido
├── database/
│   └── biblioteca.sql      # Estructura de base de datos
└── INICIAR_SISTEMA.bat     # Script principal de inicio
```

## 🎨 Características

### Frontend
- **Diseño Dark Theme** profesional
- **Responsive Design** para todos los dispositivos
- **Iconos Font Awesome** para mejor UX
- **Animaciones y transiciones** suaves
- **Sistema de notificaciones** toast

### Backend
- **API REST** con Flask
- **Autenticación JWT** segura
- **Base de datos SQLite** integrada
- **CRUD completo** para todas las entidades

### Funcionalidades
- ✅ Gestión de usuarios (Lectores y Administradores)
- ✅ Catálogo de libros con categorías
- ✅ Sistema de préstamos y devoluciones
- ✅ Reservas de libros
- ✅ Estadísticas y reportes
- ✅ Filtros y búsquedas avanzadas

## 🔧 Desarrollo

### Backend
```bash
cd backend
python app.py
```
El backend se inicia en `http://localhost:5000`

### Frontend
Abre `frontend/index.html` en tu navegador o usa el script de inicio.

## 📊 Base de Datos

El sistema utiliza SQLite con las siguientes tablas:
- `usuarios` - Gestión de usuarios
- `categorias` - Categorías de libros
- `libros` - Catálogo de libros
- `prestamos` - Sistema de préstamos
- `devoluciones` - Registro de devoluciones
- `reservas` - Sistema de reservas

## 🐛 Solución de Problemas

### Error de conexión
1. Verifica que Python esté instalado: `python --version`
2. Instala Flask: `pip install flask flask-cors`
3. Ejecuta el script de inicio: `INICIAR_SISTEMA.bat`

### Problemas con el frontend
- Asegúrate de que el backend esté corriendo
- Verifica la URL de la API en `js/app.js`
- Revisa la consola del navegador para errores

## 📝 Licencia
Proyecto educativo - Uso libre para fines académicos