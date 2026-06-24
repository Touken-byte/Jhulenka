const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

try {
    const db = new DatabaseSync('biblioteca.db');
    const sql = fs.readFileSync('biblioteca.sql', 'utf8');
    db.exec(sql);
    console.log('Base de datos biblioteca.db creada y script ejecutado correctamente.');
    db.close();
} catch (error) {
    console.error('Error al ejecutar el script de la base de datos:', error);
}
