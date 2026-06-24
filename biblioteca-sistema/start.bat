@echo off
echo ========================================
echo Sistema de Gestion de Biblioteca
echo Iniciando el sistema...
echo ========================================
echo.

cd backend

echo Verificando Python...
python --version
if errorlevel 1 (
    echo ERROR: Python no esta instalado o no esta en el PATH
    echo Por favor instala Python 3.8 o superior
    pause
    exit /b 1
)

echo.
echo Instalando dependencias...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: No se pudieron instalar las dependencias
    pause
    exit /b 1
)

echo.
echo ========================================
echo Iniciando el servidor...
echo ========================================
echo El sistema estara disponible en:
echo http://localhost:5000
echo.
echo Credenciales de administrador:
echo Correo: admin@biblioteca.com
echo Carnet: ADMIN001
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

python app.py

pause