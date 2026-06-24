# Guía para Ejecutar el Sistema en la Nube (Sin Instalar Python)

Si no deseas instalar Python en tu computadora, puedes usar servicios en la nube gratuitos para ejecutar el sistema. Aquí te presento dos opciones:

## Opción 1: PythonAnywhere (Recomendado)

### Paso 1: Crear cuenta en PythonAnywhere
1. Ve a https://www.pythonanywhere.com/
2. Haz clic en "Sign up"
3. Regístrate con tu correo electrónico (cuenta gratuita)

### Paso 2: Subir el proyecto
1. Inicia sesión en PythonAnywhere
2. Ve a la pestaña "Files"
3. Sube los archivos del proyecto:
   - Sube `backend/app.py`
   - Sube `backend/requirements.txt`
   - Sube todos los archivos del `frontend/` (index.html, css/, js/)

### Paso 3: Configurar el entorno
1. Abre una "Bash console" desde PythonAnywhere
2. Ejecuta los siguientes comandos:
```bash
# Crear directorio del proyecto
mkdir biblioteca-sistema
cd biblioteca-sistema

# Subir archivos (si los tienes en tu computadora)
# O copiar desde un repositorio Git

# Instalar dependencias
pip install -r requirements.txt --user
```

### Paso 4: Configurar aplicación web
1. Ve a la pestaña "Web"
2. Haz clic en "Add a new web app"
3. Selecciona "Manual configuration"
4. Elige Python 3.10 (o la versión disponible)
5. Configura:
   - **Source code**: `/home/tu_usuario/biblioteca-sistema/backend`
   - **Working directory**: `/home/tu_usuario/biblioteca-sistema/backend`
   - **WSGI configuration file**: Edita el archivo WSGI para apuntar a tu app

### Paso 5: Configurar archivos estáticos
1. En la pestaña "Web", ve a "Static files"
2. Agrega:
   - **URL**: `/static/`
   - **Directory**: `/home/tu_usuario/biblioteca-sistema/frontend/`

### Paso 6: Iniciar la aplicación
1. Vuelve a la pestaña "Web"
2. Haz clic en el botón verde "Reload"
3. Tu aplicación estará disponible en: `https://tu_usuario.pythonanywhere.com`

## Opción 2: Replit (Más Fácil)

### Paso 1: Crear cuenta en Replit
1. Ve a https://replit.com/
2. Regístrate con GitHub, Google o correo

### Paso 2: Crear nuevo repl
1. Haz clic en "+ Create repl"
2. Busca "Python" y selecciónalo
3. Nombra el proyecto: "biblioteca-sistema"

### Paso 3: Subir archivos
1. En el panel izquierdo, haz clic en "Add file"
2. Crea la estructura de carpetas:
   - `backend/app.py`
   - `backend/requirements.txt`
   - `frontend/index.html`
   - `frontend/css/styles.css`
   - `frontend/js/app.js`
3. Copia y pega el contenido de cada archivo

### Paso 4: Configurar dependencias
1. Replit detectará automáticamente el archivo `requirements.txt`
2. Las dependencias se instalarán automáticamente

### Paso 5: Ejecutar la aplicación
1. Haz clic en el botón "Run"
2. Replit mostrará una URL donde tu aplicación está corriendo
3. ¡Listo! Puedes acceder desde esa URL

## Opción 3: GitHub Codespaces

### Paso 1: Crear repositorio en GitHub
1. Ve a https://github.com/
2. Crea un nuevo repositorio llamado "biblioteca-sistema"
3. Sube todos los archivos del proyecto

### Paso 2: Abrir con Codespaces
1. En tu repositorio, haz clic en "Code" → "Codespaces"
2. Haz clic en "Create codespace on main"
3. Se abrirá un entorno de desarrollo en la nube

### Paso 3: Ejecutar la aplicación
1. En la terminal de Codespaces:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
2. GitHub te dará una URL para acceder a la aplicación

## Opción 4: Usar Google Colab (Para pruebas)

### Paso 1: Abrir Google Colab
1. Ve a https://colab.research.google.com/
2. Crea un nuevo notebook

### Paso 2: Instalar dependencias
```python
!pip install Flask Flask-CORS Flask-SQLAlchemy PyJWT bcrypt python-dotenv
```

### Paso 3: Ejecutar el backend
```python
from google.colab import files
import os

# Subir archivos
uploaded = files.upload()

# Ejecutar la aplicación
!python app.py
```

### Paso 4: Usar ngrok para exponer el servidor
```python
!pip install pyngrok
from pyngrok import ngrok

# Crear túnel
public_url = ngrok.connect(5000)
print(f"URL pública: {public_url}")
```

## Configuración Específica para Cada Servicio

### Para PythonAnywhere:
Modifica `app.py` para que funcione con WSGI:
```python
# Al final de app.py, agrega:
if __name__ != '__main__':
    app = app
```

### Para Replit:
Crea un archivo `.replit` en la raíz:
```
run = "cd backend && python app.py"
```

### Para todos los servicios:
Modifica la URL en `frontend/js/app.js`:
```javascript
// Cambia esta línea:
const API_URL = 'http://localhost:5000/api';

// Por la URL de tu servicio en la nube:
const API_URL = 'https://tu-dominio.com/api';
```

## Solución de Problemas Comunes

### Error: "Module not found"
- Asegúrate de que todas las dependencias estén instaladas
- Verifica que el archivo `requirements.txt` esté completo

### Error: "Port already in use"
- En la nube, usa el puerto que te asigna el servicio (generalmente 5000, 8000, o 8080)

### Error: "CORS policy"
- Asegúrate de que Flask-CORS esté instalado y configurado
- Verifica que la URL del frontend coincida con la del backend

### Error: "Database not found"
- La base de datos SQLite se creará automáticamente la primera vez
- Asegúrate de tener permisos de escritura en el directorio

## Ventajas de Cada Opción

| Servicio | Ventajas | Desventajas |
|----------|----------|-------------|
| **PythonAnywhere** | Gratis, fácil de usar, dominio propio | Límite de recursos, requiere configuración manual |
| **Replit** | Muy fácil, todo en uno, colaboración en tiempo real | Límite de uso, URL temporal |
| **GitHub Codespaces** | Entorno completo, integración con Git | Límite de horas gratuitas |
| **Google Colab** | Potente, gratuito, fácil de compartir | No es para producción, requiere configuración manual |

## Recomendación

Para **pruebas rápidas**: Usa **Replit** (el más fácil)
Para **producción gratuita**: Usa **PythonAnywhere** (más estable)
Para **desarrollo colaborativo**: Usa **GitHub Codespaces**

## Pasos Finales

Una vez que tengas el sistema corriendo en la nube:

1. **Prueba el login** con las credenciales de administrador:
   - Correo: `admin@biblioteca.com`
   - Carnet: `ADMIN001`

2. **Comparte la URL** con tus usuarios

3. **Configura un dominio personalizado** (opcional)

¡Listo! Ahora puedes usar el sistema de biblioteca sin haber instalado nada en tu computadora.

## Soporte

Si tienes problemas, consulta:
- `README.md` - Documentación principal
- `TESTING_GUIDE.md` - Guía de pruebas
- `SPRINT_1_SUMMARY.md` - Resumen del proyecto

---

**Nota**: Estos servicios en la nube tienen límites gratuitos. Para uso intensivo o producción, considera actualizar a planes pagos o usar un VPS.