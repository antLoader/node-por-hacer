const argv = require('./config.js').argv;
const colors = require('colors');
const { crearTarea, listarTareas, actualizarTarea, borrarTarea } = require('./tareas.js');

console.log(colors.rainbow(`\nARGV:\n ${argv}\n`));

switch (argv._[0]) {
    case 'crear':
        crearTarea(argv.descripcion)
            .then(console.log(colors.america('Tarea creada\n')))
            .catch(err => console.log(err));
        break;
    case 'listar':
        let listado = listarTareas(argv.completada);
        let listadoFiltrado;
        if (argv.completada === undefined) {
            listadoFiltrado = listado;
        } else if (argv.completada === 'false') {
            listadoFiltrado = listado.filter(tarea => tarea.completada === false);
        } else {
            listadoFiltrado = listado.filter(tarea => tarea.completada === true);
        }
        for (let tarea of listadoFiltrado) {
            console.log(colors.green("===================="));
            console.log(tarea.descripcion);
            console.log(`Estado: ${tarea.completada}`);
            console.log(colors.green("===================="));
        }
        break;
    case 'actualizar':
        actualizarTarea(argv.descripcion, argv.completada)
            .then(console.log(colors.reset('Tarea actualizada\n')))
            .catch(e => console.log(e));
        break;
    case 'borrar':
        try {
            borrarTarea(argv.descripcion);
            console.log(colors.reset('Tarea borrada\n'));
        } catch (err) {
            console.log(colors.red(err));
        }
        break;
    default:
        console.log("Comando irreconocible");

}