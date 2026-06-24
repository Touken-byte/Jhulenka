@echo off
echo ==========================================
echo   SISTEMA INTELIGENTE DE BIBLIOTECA
echo ==========================================
echo 
echo Iniciando servicios...

REM Cambiar al directorio del proyecto
cd /d "%~dp0"

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Verificar si Flask está instalado
python -c "import flask" 2>nul
if %errorlevel% neq 0 (
    echo Flask no está instalado. Instalando...
    pip install flask flask-cors
    if %errorlevel% neq 0 (
        echo ERROR: No se pudo instalar Flask
        pause
        exit /b 1
    )
)

echo.
echo ==========================================
echo   INICIANDO BACKEND (Flask API)
echo ==========================================
echo URL: http://localhost:5000
echo.
echo NOTA: Mantén esta ventana abierta para que el backend funcione
echo ==========================================
echo.

REM Iniciar el backend en una nueva ventana
start "BACKEND - Flask API" cmd /k "cd backend && python app.py"

REM Esperar 3 segundos para que el backend se inicie
timeout /t 3 /nobreak >nul

echo.
echo ==========================================
echo   INICIANDO FRONTEND (Navegador)
echo ==========================================
echo URL: http://localhost:5000
echo.
echo ==========================================
echo.

REM Abrir el frontend en el navegador
start "" "http://localhost:5000"

echo Sistema iniciado exitosamente!
echo.
echo CREDENCIALES DE ADMINISTRADOR:
echo   Correo: admin@biblioteca.com
echo   Carnet: ADMIN001
echo.
echo Para detener el sistema:
echo   1. Cierra la ventana del BACKEND
echo   2. Cierra el navegador
echo.
pause