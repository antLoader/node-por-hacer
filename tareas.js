const fs = require('fs');
const colors = require('colors');

let tareas = [];

const crearTarea = async descripcion => {
    cargarTareasBD();
    if (!descripcion) throw new Error('No se ha introducido una descripción');
    let tareaObj = { descripcion, completada: false };
    tareas.push(tareaObj);
    grabarTareaBD();
    return tareaObj;
}

const grabarTareaBD = async() => {
    let data = JSON.stringify(tareas);
    fs.writeFile('./tareas.json', data, err => {
        if (err) throw new Error('No se pudo escribir');
    });
}

const cargarTareasBD = async() => {
    try {
        tareas = require('./tareas.json');
    } catch (err) {
        tareas = [];
    }
}

const listarTareas = () => {
    cargarTareasBD();
    return tareas;
}

const actualizarTarea = async(descripcion, completada) => {
    cargarTareasBD();
    let index = tareas.findIndex(tarea => tarea.descripcion === descripcion);
    if (index != -1) {
        tareas[index].completada = completada;
    } else {
        throw new Error('No existe una tarea con esa descripcion');
    }
    //let tareaAct = tareas.find(tarea => tarea.descripcion === descripcion);
    //if (!tareaAct) throw new Error('No existe la tarea');
    //tareaAct.completada = completada;
    grabarTareaBD();
}

const borrarTarea = (descripcion) => {
    cargarTareasBD();
    let index = tareas.findIndex(tarea => tarea.descripcion === descripcion);
    if (index != -1) {
        console.log(colors.bgRed(index));
        tareas.splice(index, 1);
        grabarTareaBD();
    } else {
        throw new Error('No se puede borrar una tarea inexistente');
    }
}

module.exports = {
    crearTarea,
    listarTareas,
    actualizarTarea,
    borrarTarea
}