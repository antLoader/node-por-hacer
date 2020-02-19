const crearOpt = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea a realizar'
    }
};

const actOpt = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: "Descripcion de la tarea a actualizar"
    },
    completada: {
        alias: 'c',
        default: true,
        desc: "Marca como completada o pendiente la tarea"
    }
};

const borrarOpt = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea a borrar'
    }
};

const listarOpt = {
    completada: {
        demand: false,
        alias: 'c',
        desc: 'Lista tareas completadas o sin completar'
    }
};

const argv = require('yargs')
    .command('listar', 'Lista las tareas', listarOpt)
    .command('crear', 'Crea una tarea', crearOpt)
    .command('actualizar', 'Actualiza una tarea', actOpt)
    .command('borrar', 'Borra una tarea', borrarOpt)
    .help()
    .argv;

module.exports = {
    argv
}