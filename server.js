/**
  Author:       M.Ripoll
  Date:         Dec.25
  Description:  Servidor Web
**/

const express = require('express');
const path = require('path');
const fs = require('fs'); // Lectura y escritura datos PC
const app = express();

const PORT = 3000;


app.use(express.json()); // Para entender JSON en las peticiones
app.use(express.static(__dirname)); // Servir archivos estáticos desde la carpeta actual

app.get('/', (req, res) => {
    // Cargo html inicial
    res.sendFile(path.join(__dirname, 'main_index.html'));
});

// Mini base de datos para el Quiz de Vida Submarina
app.post('/api/guardar-puntuacion', (req, res) => {
    const nuevaPuntuacion = req.body; 
    const archivoDb = 'puntuaciones.json';

    let datos = [];

    // Si el archivo ya existe, leemos lo que tiene dentro
    if (fs.existsSync(archivoDb)) {
        const contenido = fs.readFileSync(archivoDb, 'utf-8');
        try {
            datos = JSON.parse(contenido);
        } catch (e) {
            console.log("El archivo estaba vacío o corrupto");
        }
    }

    // Añadimos la nueva puntuación y la fecha a la lista
    nuevaPuntuacion.fecha = new Date().toLocaleDateString();
    datos.push(nuevaPuntuacion);

    // Guardamos la lista actualizada en el archivo
    fs.writeFileSync(archivoDb, JSON.stringify(datos, null, 2));

    console.log(`Guardado: ${nuevaPuntuacion.nombre} - ${nuevaPuntuacion.puntos} pts`);
    
    // Respondemos al navegador que todo ha ido bien
    res.json({ exito: true, mensaje: "¡Puntuación guardada correctamente!" });
});

// Lectura Ranking
app.get('/api/ranking', (req, res) => {
    const archivoDb = 'puntuaciones.json';
    
    if (fs.existsSync(archivoDb)) {
        const contenido = fs.readFileSync(archivoDb, 'utf-8');
        res.send(contenido); 
    } else {
        res.json([]); 
    }
});

// Log para saber si el servidor está vivo
app.listen(PORT, () => {
    console.log(`\nVIDA SUBMARINA - SERVIDOR LISTO `);
    console.log(`----------------------------------------`);
    console.log(`Web disponible en:    http://localhost:${PORT}`);
    console.log(`----------------------------------------`);
});