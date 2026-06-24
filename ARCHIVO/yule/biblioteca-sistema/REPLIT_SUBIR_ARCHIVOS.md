# Cómo Subir Archivos a Replit - Guía Visual Paso a Paso

## Método 1: Copiar y Pegar (Más Fácil)

### Paso 1: Abrir Replit
1. Ve a https://replit.com/
2. Inicia sesión
3. Haz clic en **"+ Create repl"**
4. Selecciona **Python** y ponle nombre `biblioteca-sistema`
5. Haz clic en **"Create Repl"**

### Paso 2: Eliminar Archivo por Defecto
1. Verás un archivo llamado `main.py` en el panel izquierdo
2. Haz clic derecho sobre `main.py`
3. Selecciona **"Delete"** o **"Eliminar"**

### Paso 3: Crear Carpetas
1. En el panel izquierdo (donde dice "Files"), haz clic en **"New Folder"**
2. Escribe el nombre: `backend` y presiona Enter
3. Haz clic de nuevo en **"New Folder"**
4. Escribe: `frontend` y presiona Enter
5. Haz clic derecho en `frontend` → **"New Folder"**
6. Crea: `css`
7. Haz clic derecho en `frontend` → **"New Folder"**
8. Crea: `js`

### Paso 4: Subir Primer Archivo (requirements.txt)

1. **Abre el archivo en tu computadora:**
   - Ve a la carpeta: `C:\Users\maler\OneDrive\Escritorio\yule\biblioteca-sistema\backend`
   - Haz doble clic en `requirements.txt` (se abrirá en el Bloc de Notas)

2. **Copia todo el contenido:**
   - Presiona `Ctrl + E` (seleccionar todo)
   - Presiona `Ctrl + C` (copiar)

3. **Pega en Replit:**
   - En Replit, haz clic derecho en la carpeta `backend`
   - Selecciona **"New File"**
   - Escribe: `requirements.txt`
   - Presiona Enter
   - En el editor de la derecha, presiona `Ctrl + V` (pegar)
   - Presiona `Ctrl + S` (guardar)

### Paso 5: Subir app.py

1. **Abre el archivo en tu computadora:**
   - Ve a la misma carpeta `backend`
   - Haz doble clic en `app.py`

2. **Copia todo el contenido:**
   - `Ctrl + E` (seleccionar todo)
   - `Ctrl + C` (copiar)

3. **Pega en Replit:**
   - En Replit, haz clic derecho en `backend`
   - **"New File"**
   - Escribe: `app.py`
   - Pega con `Ctrl + V`
   - Guarda con `Ctrl + S`

### Paso 6: Subir index.html

1. **Abre el archivo en tu computadora:**
   - Ve a: `C:\Users\maler\OneDrive\Escritorio\yule\biblioteca-sistema\frontend`
   - Haz doble clic en `index.html`

2. **Copia todo:**
   - `Ctrl + E`
   - `Ctrl + C`

3. **Pega en Replit:**
   - En Replit, haz clic derecho en `frontend`
   - **"New File"**
   - Escribe: `index.html`
   - Pega con `Ctrl + V`
   - Guarda con `Ctrl + S`

### Paso 7: Subir styles.css

1. **Abre en tu computadora:**
   - Ve a: `C:\Users\maler\OneDrive\Escritorio\yule\biblioteca-sistema\frontend\css`
   - Haz doble clic en `styles.css`

2. **Copia:**
   - `Ctrl + E`
   - `Ctrl + C`

3. **Pega en Replit:**
   - En Replit, haz clic derecho en `frontend/css`
   - **"New File"**
   - Escribe: `styles.css`
   - Pega con `Ctrl + V`
   - Guarda con `Ctrl + S`

### Paso 8: Subir app.js

1. **Abre en tu computadora:**
   - Ve a: `C:\Users\maler\OneDrive\Escritorio\yule\biblioteca-sistema\frontend\js`
   - Haz doble clic en `app.js`

2. **Copia:**
   - `Ctrl + E`
   - `Ctrl + C`

3. **Pega en Replit:**
   - En Replit, haz clic derecho en `frontend/js`
   - **"New File"**
   - Escribe: `app.js`
   - Pega con `Ctrl + V`
   - Guarda con `Ctrl + S`

### Paso 9: Crear Archivo .replit

1. En Replit, en la raíz (fuera de las carpetas), haz clic en **"New File"**
2. Escribe exactamente: `.replit` (con el punto al inicio)
3. Pega este contenido:
```
run = "cd backend && python app.py"
```
4. Guarda con `Ctrl + S`

### Paso 10: Ejecutar

1. Haz clic en el botón verde **"Run"** (arriba al centro)
2. Espera a que se instalen las dependencias
3. Cuando veas `Running on http://0.0.0.0:5000`, ¡listo!
4. Haz clic en **"Webview"** o **"Open in new tab"** para ver la aplicación

## Método 2: Arrastrar y Soltar (Más Rápido)

### Paso 1: Preparar Archivos en tu Computadora

1. Abre el Explorador de Archivos
2. Ve a: `C:\Users\maler\OneDrive\Escritorio\yule\biblioteca-sistema`
3. Selecciona estos archivos:
   - `backend/app.py`
   - `backend/requirements.txt`
   - `frontend/index.html`
   - `frontend/css/styles.css`
   - `frontend/js/app.js`

### Paso 2: Subir a Replit

1. En Replit, en el panel izquierdo (Files), arrastra cada archivo a la carpeta correspondiente:
   - `app.py` → carpeta `backend`
   - `requirements.txt` → carpeta `backend`
   - `index.html` → carpeta `frontend`
   - `styles.css` → carpeta `frontend/css`
   - `app.js` → carpeta `frontend/js`

### Paso 3: Crear .replit y Ejecutar

(Sigue los pasos 9 y 10 del método anterior)

## Verificación Final

Después de subir todos los archivos, tu panel izquierdo debería verse así:

```
biblioteca-sistema/
├── .replit
├── backend/
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        └── app.js
```

## Solución de Problemas

### No puedo crear carpetas
- Asegúrate de hacer clic en **"New Folder"** (no "New File")
- El nombre debe ser exacto: `backend` y `frontend`

### Los archivos no se guardan
- Presiona `Ctrl + S` después de pegar cada archivo
- Verifica que el nombre del archivo sea correcto

### Error al ejecutar
- Verifica que todos los archivos estén en las carpetas correctas
- Asegúrate de que el archivo `.replit` tenga exactamente ese contenido
- Haz clic en **"Stop"** y luego **"Run"** de nuevo

### No veo el Webview
- Espera a que termine de cargar (puede tomar 1-2 minutos)
- Busca el panel "Webview" en la parte inferior derecha
- Haz clic en "Open in new tab"

## ¡Listo!

Una vez que veas la aplicación:
- **Correo**: admin@biblioteca.com
- **Carnet**: ADMIN001

## Video Tutorial (Opcional)

Si prefieres ver un video, busca en YouTube:
- "Cómo subir archivos a Replit"
- "Replit tutorial para principiantes"

## ¿Sigues teniendo problemas?

Si después de seguir estos pasos aún no puedes subir los archivos:
1. Toma una captura de pantalla de tu pantalla en Replit
2. Describe exactamente qué error ves
3. Pregúntame de nuevo con esa información

¡Éxito! 🚀