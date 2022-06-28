const examenes = require('../data/Examenes');

async function buscarCurso(id){    
    return examenes.buscarCurso(id);
}

async function agregarCurso(examen){
    return examenes.agregarCurso(examen);
}

async function actualizarExamen(examen, id){
    return examenes.actualizarExamen(examen, id);
}

async function borrarExamen(id){    
    return examenes.borrarExamen(id);
}

async function getTodosExamenes(){    
    return examenes.getTodosExamenes();
}

async function agregarVideosExamen(id, resultado){
    return resultados.agregarVideosExamen(id, resultado);
}

module.exports = {buscarCurso,agregarCurso,actualizarExamen,borrarExamen, getTodosExamenes, agregarVideosExamen};