import express from 'express';
import { fileURLToPath } from 'url'; // función para convertir URL de archivo a ruta de sistema de archivos
import { dirname } from 'path'; // funciones para manejo de rutas de archivos y directorios
import { agregarNuevoRoommate, obtenerRoommates } from './roommate.js';
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

// Solicitud GET a la ruta raíz ("/")
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/roommate', async (req, res) => {
    try {
        const nuevo = await agregarNuevoRoommate();
        console.log(nuevo);
        res.status(201).json(nuevo); 

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/roommates', async (req, res) => {
    try {
        const roommates = await obtenerRoommates();
        //console.log(roommates);
        res.status(201).json(roommates);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
    
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});