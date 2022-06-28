const conn = require('./conn');
//const DATABASE = 'tp_integrador';
const DATABASE = 'tp_nt2';
//const EXAMENES = 'Examenes';
const EXAMENES = 'cursos';
const objectId = require('mongodb').ObjectId;

async function buscarCurso(id) {
    const connectiondb = await conn.getConnection();
    const examen = await connectiondb
        .db(DATABASE)
        .collection(EXAMENES)
        .findOne({ _id: new objectId(id) });
    return examen;
}

async function agregarCurso(examen) {
    console.log("lego al agregar?")
    const connectiondb = await conn.getConnection();
    const examenNuevo = {
        ...examen,
        date: new Date(),
        videos: [],
        questions: []
    }

    const result = await connectiondb
        .db(DATABASE)
        .collection(EXAMENES)
        .insertOne(examenNuevo);
    return result;
}

async function actualizarExamen(examen, id) {
    console.log("ENTRO AL DATA?", examen, id)

    const connectiondb = await conn.getConnection();
    const examenEncontrado = await buscarCurso(id);

    if (!examenEncontrado) {
        throw new Error('No existe examen para ese id')
    }

    const result = await connectiondb
        .db(DATABASE)
        .collection(EXAMENES)
        .updateOne({ _id: new objectId(id) },
            {
                $set: {                 
                    name: examen.name,
                    duracion: examen.duracion,
                    direccion: examen.direccion,
                    descripcion: examen.descripcion,
                    valor: examen.valor,
                    video: examen.video,
                    inicio: examen.inicio,
                    intro: examen.intro,
                    img: examen.img,
                }
            });

    const CursoModificado = await buscarCurso(id)
    console.log(result)
    return CursoModificado;

}

async function borrarExamen(id) {
    const connectiondb = await conn.getConnection();
    const examenEncontrado = await buscarCurso(id);

    if (!examenEncontrado) {
        throw new Error('No existe examen para ese id')
    }

    const result = await connectiondb
        .db(DATABASE)
        .collection(EXAMENES)
        .deleteOne({ _id: new objectId(id) });
    return result;
}

async function getTodosExamenes() {
    const connectiondb = await conn.getConnection();
    const examenes = await connectiondb
        .db(DATABASE)
        .collection(EXAMENES)
        .find({})
        .toArray();
    return examenes;
}

module.exports = { buscarCurso, agregarCurso, actualizarExamen, borrarExamen, getTodosExamenes };