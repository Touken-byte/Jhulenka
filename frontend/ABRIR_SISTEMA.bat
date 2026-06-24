@echo off
echo ========================================
echo Sistema de Gestion de Biblioteca
echo Version Standalone (Sin Python)
echo ========================================
echo.
echo Abriendo el sistema en tu navegador...
echo.
echo Credenciales de administrador:
echo Correo: admin@biblioteca.com
echo Carnet: ADMIN001
echo.
echo Para usar el sistema, simplemente abre el archivo:
echo biblioteca-sistema\frontend\sistema-completo.html
echo.
echo Los datos se guardan en el navegador (localStorage)
echo ========================================
echo.

start "" "sistema-completo.html"

echo.
echo El sistema se ha abierto en tu navegador predeterminado.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul