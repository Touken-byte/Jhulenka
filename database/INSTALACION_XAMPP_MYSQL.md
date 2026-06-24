# Guía de Instalación - MySQL/XAMPP para Sistema de Biblioteca

Esta guía te ayudará a configurar tu sistema de biblioteca con MySQL usando XAMPP.

## Paso 1: Instalar XAMPP

1. Descarga XAMPP desde: https://www.apachefriends.org/download.html
2. Instala XAMPP en la ruta por defecto: `C:\xampp`
3. Inicia el panel de control de XAMPP

## Paso 2: Iniciar MySQL en XAMPP

1. Abre el panel de control de XAMPP
2. Haz clic en "Start" en la fila de **Apache** (opcional, para phpMyAdmin)
3. Haz clic en "Start" en la fila de **MySQL**
4. Espera a que ambos servicios estén en verde

## Paso 3: Crear la Base de Datos

### Opción A: Usando phpMyAdmin (Recomendado)

1. Abre tu navegador y ve a: `http://localhost/phpmyadmin`
2. Inicia sesión (usuario: `root`, contraseña: vacía por defecto)
3. Haz clic en la pestaña **"SQL"** en la parte superior
4. Copia y pega el contenido del archivo `database/biblioteca_mysql.sql`
5. Haz clic en **"Continuar"** para ejecutar el script
6. Verifica que se haya creado la base de datos `biblioteca` en el panel izquierdo

### Opción B: Usando la línea de comandos

1. Abre una terminal o símbolo del sistema
2. Navega a la carpeta de MySQL de XAMPP:
   ```bash
   cd C:\xampp\mysql\bin
   ```
3. Ejecuta el script SQL:
   ```bash
   mysql -u root -p < "f:/base de datos IIII/database/biblioteca_mysql.sql"
   ```
   (Presiona Enter cuando pida la contraseña - por defecto está vacía)

## Paso 4: Configurar el Backend Python

1. Abre una terminal en la carpeta del backend:
   ```bash
   cd "f:/base de datos IIII/biblioteca-sistema/backend"
   ```

2. Crea un entorno virtual (recomendado):
   ```bash
   python -m venv venv
   ```

3. Activa el entorno virtual:
   ```bash
   # En Windows (CMD)
   venv\Scripts\activate
   
   # En Windows (PowerShell)
   venv\Scripts\Activate.ps1
   ```

4. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

5. Crea un archivo `.env` basado en el ejemplo:
   ```bash
   copy .env.example .env
   ```

6. Edita el archivo `.env` si necesitas cambiar las credenciales de MySQL:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=biblioteca
   DB_USER=root
   DB_PASSWORD=
   DB_CHARSET=utf8mb4
   ```

## Paso 5: Ejecutar el Backend

1. Con el entorno virtual activado, ejecuta:
   ```bash
   python app.py
   ```

2. El servidor se iniciará en: `http://localhost:5000`

## Paso 6: Verificar la Instalación

1. Abre tu navegador y ve a: `http://localhost:5000`
2. Deberías ver un mensaje de bienvenida del sistema

## Solución de Problemas Comunes

### Error: "Can't connect to MySQL server"

- Verifica que MySQL esté corriendo en XAMPP (luz verde)
- Verifica que el puerto 3306 no esté siendo usado por otro servicio

### Error: "Access denied for user 'root'@'localhost'"

- Si cambiaste la contraseña de MySQL en XAMPP, actualiza el archivo `.env`
- Por defecto, XAMPP usa usuario `root` sin contraseña

### Error: "Unknown database 'biblioteca'"

- Ejecuta nuevamente el script SQL en phpMyAdmin
- Verifica que la base de datos se creó correctamente

### Error: "No module named 'pymysql'"

- Asegúrate de haber instalado las dependencias: `pip install -r requirements.txt`
- Verifica que el entorno virtual esté activado

## Datos de Ejemplo

El sistema incluye datos de ejemplo:

- **Usuario Administrador:**
  - Correo: `admin@biblioteca.com`
  - Carnet: `ADMIN001`

- **Categorías:** Ficción, Ciencia Ficción, Tecnología, Educación, Historia, Matemáticas

- **Libros:** 5 libros de ejemplo en diferentes categorías

## Comandos Útiles

### Reiniciar MySQL en XAMPP
1. Detén MySQL en el panel de XAMPP
2. Espera 5 segundos
3. Inicia MySQL nuevamente

### Ver logs de MySQL
- Los logs están en: `C:\xampp\mysql\data\mysql_error.log`

### Respaldar base de datos
```bash
cd C:\xampp\mysql\bin
mysqldump -u root biblioteca > respaldo.sql
```

### Restaurar base de datos
```bash
cd C:\xampp\mysql\bin
mysql -u root biblioteca < respaldo.sql
```

## Notas Importantes

1. **XAMPP debe estar ejecutándose** cada vez que uses el sistema
2. **No detengas MySQL** mientras el backend esté en uso
3. Los triggers y vistas se crean automáticamente al ejecutar el script SQL
4. El sistema usa `pymysql` como conector entre Python y MySQL

## Soporte

Si tienes problemas, revisa:
1. Que XAMPP esté instalado correctamente
2. Que MySQL esté corriendo (luz verde en XAMPP)
3. Que las credenciales en `.env` coincidan con las de XAMPP
4. Que el script SQL se haya ejecutado sin errores