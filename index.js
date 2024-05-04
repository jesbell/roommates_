import express from 'express';
import { fileURLToPath } from 'url'; // función para convertir URL de archivo a ruta de sistema de archivos
import { dirname } from 'path'; // funciones para manejo de rutas de archivos y directorios
import { agregarNuevoRoommate, obtenerRoommates, agregarNuevoGasto, obtenerGastos, actualizarGasto, borrarGasto } from './roommate.js';
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

// Solicitud GET a la ruta raíz ("/")
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Endpoint para agregar nuevo roommates
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

// Endpoint para obtener roommates
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

// Endpoint para agregar un gasto
app.post('/gasto', async (req, res) => {
    try {
        const { roommateId, roommate, descripcion, monto } = req.body;
        res.status(200).json(agregarNuevoGasto(roommateId, roommate, descripcion, monto)); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
    
});

// Endpoint para obtener gastos
app.get('/gastos', async (req, res) => {
    try {
        const gastos = await obtenerGastos();
        res.status(201).json(gastos);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });        
    }
    
});

// Endpoint para actualizar un gasto
app.put('/gasto', async (req, res) => {
    try {
        const { id } = req.query;
        const { roommate, descripcion, monto } = req.body;
        //console.log(id);
        const gastoActualizado = await actualizarGasto(id, roommate, descripcion, monto);
        res.status(200).json({ message: 'Gasto actualizado correctamente'});
    } catch (error) {
        console.error('Error al actualizar el gasto:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar el gasto' });
    }
});

// Endpoint para borrar un gasto
app.delete('/gasto', async (req, res) => {
    try {
        const { id } = req.query;
        await borrarGasto(id);
        res.status(200).json({ message: 'Gasto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el gasto:', error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el gasto' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});