# Guía Rápida: Ejecutar en Replit (Paso a Paso)

Esta guía te llevará de la mano para ejecutar el sistema de biblioteca en Replit sin instalar nada.

## Paso 1: Crear Cuenta en Replit

1. Abre tu navegador y ve a: **https://replit.com/**
2. Haz clic en **"Sign Up"** (arriba a la derecha)
3. Elige una de estas opciones:
   - **Sign up with Google** (recomendado, más rápido)
   - **Sign up with GitHub**
   - **Sign up with Email**
4. Completa el registro

## Paso 2: Crear un Nuevo Proyecto

1. Una vez en Replit, haz clic en el botón **"+ Create repl"** (arriba a la izquierda)
2. En el buscador, escribe **"Python"** y selecciónalo
3. En **"Repl title"**, escribe: `biblioteca-sistema`
4. Haz clic en **"Create Repl"**

## Paso 3: Crear la Estructura de Carpetas

1. En el panel izquierdo (Files), verás un archivo `main.py` por defecto
2. **Elimina** `main.py` (clic derecho → Delete)
3. Crea las carpetas:
   - Haz clic en **"New Folder"** y nombra: `backend`
   - Haz clic en **"New Folder"** y nombra: `frontend`
4. Dentro de `frontend`, crea:
   - **"New Folder"** → `css`
   - **"New Folder"** → `js`

## Paso 4: Crear y Pegar los Archivos

### Archivo 1: `backend/requirements.txt`
1. Haz clic derecho en la carpeta `backend` → **"New File"**
2. Nombra el archivo: `requirements.txt`
3. Abre el archivo `requirements.txt` que está en tu computadora (en `biblioteca-sistema/backend/`)
4. Copia TODO el contenido y pégalo en el editor de Replit
5. Guarda con **Ctrl+S** o **Cmd+S**

### Archivo 2: `backend/app.py`
1. Haz clic derecho en `backend` → **"New File"**
2. Nombra: `app.py`
3. Abre el archivo `app.py` de tu computadora
4. Copia TODO el contenido y pégalo en Replit
5. Guarda

### Archivo 3: `frontend/index.html`
1. Haz clic derecho en `frontend` → **"New File"**
2. Nombra: `index.html`
3. Copia el contenido de `index.html` de tu computadora
4. Pega en Replit y guarda

### Archivo 4: `frontend/css/styles.css`
1. Haz clic derecho en `frontend/css` → **"New File"**
2. Nombra: `styles.css`
3. Copia el contenido de `styles.css` de tu computadora
4. Pega en Replit y guarda

### Archivo 5: `frontend/js/app.js`
1. Haz clic derecho en `frontend/js` → **"New File"**
2. Nombra: `app.js`
3. Copia el contenido de `app.js` de tu computadora
4. Pega en Replit y guarda

## Paso 5: Configurar para Ejecutar

1. En la raíz del proyecto (fuera de las carpetas), crea un archivo llamado `.replit`
2. Pega este contenido:
```
run = "cd backend && python app.py"
```
3. Guarda

## Paso 6: Ejecutar la Aplicación

1. Haz clic en el botón verde **"Run"** (arriba en el centro)
2. Espera a que se instalen las dependencias (verás mensajes en la consola)
3. Cuando veas: `* Running on http://0.0.0.0:5000` ¡está listo!

## Paso 7: Abrir el Frontend

1. En el panel derecho (Console), verás un enlace que dice **"Webview"**
2. Haz clic en **"Open in a new tab"** o en el icono de "external link"
3. ¡Verás la interfaz del sistema de biblioteca!

## Paso 8: Iniciar Sesión

Usa las credenciales de administrador:
- **Correo**: `admin@biblioteca.com`
- **Carnet**: `ADMIN001`

## ¡Listo! 🎉

Ahora puedes:
- Registrar usuarios
- Agregar libros
- Crear préstamos
- Gestionar devoluciones
- Hacer reservas

## Compartir tu Proyecto

Para que otros usen el sistema:
1. En Replit, haz clic en **"Share"** (arriba a la derecha)
2. Copia el enlace que aparece
3. Comparte ese enlace con tus usuarios

Ellos podrán acceder a la aplicación web directamente.

## Problemas Comunes y Soluciones

### Error: "Module not found"
- Espera a que Replit termine de instalar las dependencias
- Si persiste, haz clic en **"Stop"** y luego **"Run"** de nuevo

### Error: "Port already in use"
- Haz clic en **"Stop"** y luego **"Run"** nuevamente

### No veo la interfaz web
- Asegúrate de haber creado todos los archivos en las carpetas correctas
- Verifica que `index.html` esté en la carpeta `frontend/`

### La página se ve sin estilos
- Verifica que `styles.css` esté en `frontend/css/`
- Verifica que `app.js` esté en `frontend/js/`

## Actualizar el Proyecto

Si necesitas hacer cambios:
1. Edita los archivos en Replit
2. Guarda con **Ctrl+S**
3. La aplicación se recargará automáticamente

## Recursos Útiles

- **Documentación principal**: `README.md` (en tu computadora)
- **Guía de pruebas**: `TESTING_GUIDE.md`
- **Soporte**: Revisa la consola de Replit para ver errores

## Nota Importante

Replit es gratuito pero tiene límites:
- El proyecto se "duerme" después de cierta inactividad
- Para "despertarlo", simplemente recarga la página
- Para uso profesional continuo, considera PythonAnywhere o un VPS

---

**¡Disfruta tu sistema de biblioteca!** 📚

Si tienes problemas, revisa el archivo `CLOUD_SETUP_GUIDE.md` para más opciones.