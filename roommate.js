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
        console.log(nuevoGasto.id);
        await calculandoGastos(nuevoGasto.id, 0, false);
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
        // guardando monto anterior
        const montoAnterior = gastoEncontrado.monto;

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
        if(gastoEncontrado.monto !== montoAnterior){
            await calculandoGastos(gastoEncontrado.id, montoAnterior, false);
        }
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
        await calculandoGastos(id, 0, true);
        fs.writeFileSync('apis/gastos.json', JSON.stringify({ gastos }, null, 2)); 
        
    } catch (error) {
        console.error('Error al eliminar gasto:', error);
        throw new Error(error);
    }  
}

// función que modifica el debe y recibe de los roommates 
// idgastos es para indicarle a la función cual id de gastos buscar.
// montoAnterior nos indica si el monto fue modificado
// eliminado: indica si el gasto será eliminado o no
async function calculandoGastos(idgastos, montoAnterior, eliminado){
    try {
        // Buscamos el gasto agregado, actualizado o a eliminar.
        const gastosJSON = await obtenerGastos();
        const gastos = gastosJSON.gastos;
        const gastoEncontrado = gastos.find(gasto => gasto.id === idgastos);

        // Traemos a todos los roommates existentes
        const roommatesJSON = await obtenerRoommates();
        const roommates = roommatesJSON.roommates;

        // Contamos la cantidad de roommates
        const longitudRoommates = roommates.length;

        // repartimos el (nuevo) monto entre los roommates
        const montoPorPersona  = gastoEncontrado.monto/longitudRoommates;

        if(montoAnterior > 0){
            // Si el monto fue modificado: Se elimina (resta) el monto anterior,
            // y se suma el nuevo monto (recibe y debe)
            const montoPorPersonaAnterior  = montoAnterior/longitudRoommates;
            roommates.forEach((r) => {
                if(r.id !== gastoEncontrado.roommateId){
                    r.debe -= montoPorPersonaAnterior;
                    r.debe += montoPorPersona;
                }
                else{
                    r.recibe -= montoPorPersonaAnterior;
                    r.recibe += montoPorPersona ;
                }    
            });
        }
        else if(eliminado){
            // Si se elimina un gasto, se elimina los montos que debe y recibe los roommates
            roommates.forEach((r) => {
                if(r.id !== gastoEncontrado.roommateId){
                    r.debe -= montoPorPersona ;
                }
                else{
                    r.recibe -= montoPorPersona ;
                }    
            });
        }
        else{
            // Si solo se a agregado un nuevo monto,
            // Se agrega el monto por persona según corresponda
            roommates.forEach((r) => {
                if(r.id !== gastoEncontrado.roommateId){
                    r.debe += montoPorPersona ;
                }
                else{
                    r.recibe += montoPorPersona ;
                }    
            });

        }

        // Actualizamos roommates.json con los nuevos datos.
        const nuevoRoommatesJSON = { roommates };
        fs.writeFileSync('apis/roommates.json', JSON.stringify(nuevoRoommatesJSON, null, 2));

    } catch (error) {
        console.error('Error al calcular gastos:', error);
        throw new Error(error);
    }
    
}


export { 
    agregarNuevoRoommate, 
    obtenerRoommates, 
    agregarNuevoGasto, 
    obtenerGastos, 
    actualizarGasto,
    borrarGasto };