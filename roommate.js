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

async function agregarNuevoGasto(roommateId, roommate, descripcion, monto) {
    try {
        const nuevoGasto = {
            id: uuidv4().slice(30),
            roommateId: roommateId,
            roommate: roommate,
            descripcion: descripcion,
            monto: monto
        };
        const gastosJSON = JSON.parse(fs.readFileSync('apis/gastos.json', "utf8"));
        const gastos = gastosJSON.gastos;
        gastos.push(nuevoGasto);
        fs.writeFileSync('apis/gastos.json', JSON.stringify(gastosJSON, null, 2)); 
        return nuevoGasto;
    } catch (error) {
        console.error('Error al agregar nuevo gasto:', error);
        throw new Error('Error al obtener nuevo gasto');
    }
}

function obtenerGastos() {
    try {
        const data = fs.readFileSync('apis/gastos.json');
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function actualizarGasto(id, roommate, descripcion, monto) {
    try {
        const gastosJSON = obtenerGastos();
        const gastos = gastosJSON.gastos;
        const gastoEncontrado = gastos.find(gasto => gasto.id === id);

        if(gastoEncontrado){
            // Actualizar los campos del gasto
            gastoEncontrado.roommate = roommate;
            gastoEncontrado.descripcion = descripcion;
            gastoEncontrado.monto = monto;
        }
        else{
            throw new Error('No se encontró el gasto con el ID especificado');
        }

        fs.writeFileSync('apis/gastos.json', JSON.stringify(gastosJSON, null, 2));
        return gastoEncontrado;
        
    } catch (error) {
        console.error('Error al actualizar gasto:', error);
        throw new Error(error);
    }
}

async function borrarGasto(id){
    try {
        const gastosJSON = await obtenerGastos();
        let gastos = gastosJSON.gastos;
        gastos = gastos.filter((gasto) => gasto.id !== id);
        fs.writeFileSync('apis/gastos.json', JSON.stringify({ gastos }, null, 2)); 
        
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        throw new Error(error);
    }  
}

async function calculandoGastos(idgastos){
    
    const gastosJSON = await obtenerGastos();
    const gastos = gastosJSON.gastos;
    const gastoEncontrado = gastos.find(gasto => gasto.id === idgastos);

    const roommatesJSON = await obtenerRoommates();
    const roommates = roommatesJSON.roommates;
    // me dio perezaaa


}


export { 
    agregarNuevoRoommate, 
    obtenerRoommates, 
    agregarNuevoGasto, 
    obtenerGastos, 
    actualizarGasto,
    borrarGasto };