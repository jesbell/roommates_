import axios from "axios";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

async function agregarNuevoRoommate() {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const nuevo = response.data.results[0];
        const nuevoRoommate = {
            id: uuidv4().slice(30),
            nombre: `${nuevo.name.first} ${nuevo.name.last}`,
            debe: 0,
            recibe: 0
        };
        const roommatesJSON = JSON.parse(fs.readFileSync('apis/roommates.json', "utf8"));
        const roommates = roommatesJSON.roommates;
        roommates.push(nuevoRoommate);
        fs.writeFileSync('apis/roommates.json', JSON.stringify(roommatesJSON, null, 2)); 
        return nuevoRoommate;
    } catch (error) {
        console.error('Error al agregar nuevo roommate:', error);
        throw new Error('Error al obtener nuevo roommate:', error);
    }
}

function obtenerRoommates() {
    try {
        const data = fs.readFileSync('apis/roommates.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export { agregarNuevoRoommate, obtenerRoommates };