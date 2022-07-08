const conn = require('./conn');
//const DATABASE = 'tp_integrador';
const DATABASE = 'tp_nt2';
//const USUARIOS = 'Usuarios';
const USUARIOS = 'usuarios';
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

//LOGIN
async function findByCredentials(email, password) {
    const connectiondb = await conn.getConnection();
    const usuario = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .findOne({ email: email });
    if (!usuario) {
        throw new Error('Credenciales no validas');
    }

    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
        throw new Error('Credenciales no validas');
    }
    return usuario;
}

//BUSCAR USUARIO POR MAIL
async function getUsuarioByEmail(email) {

    const connectiondb = await conn.getConnection();
    const usuario = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        //.find({ email: email })
        //.toArray();
        .findOne({ email: email });
    return usuario;
}

async function getUsuarioById(id) {
    const connectiondb = await conn.getConnection();
    const usuario = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .findOne({ _id: new objectId(id) });
    return usuario;
}

async function agregarAlumno(alumno) {

    const connectiondb = await conn.getConnection();
    const usuario = await getUsuarioByEmail(alumno.email)

    if (usuario) {

        throw new Error('Ya hay un mail registrado')
    }

    alumno.password = await bcrypt.hash(alumno.password, 8);
    const alumnoNuevo = {
        ...alumno,
        rol: 'alumno',
        results: []
    }
    const result = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .insertOne(alumnoNuevo);
    return result;
}



async function actualizarAlumno(alumno, id) {
    const connectiondb = await conn.getConnection();
    const usuario = await getUsuarioById(id)

    if (!usuario) {
        throw new Error('No existe alumno para ese id')
    }
    const result = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .updateOne({ _id: new objectId(id) },
            {
                $set: {
                    name: alumno.name,
                    email: alumno.email,
                    /*   password: await bcrypt.hash(alumno.password, 8), */
                    phone: alumno.phone,
                    edad: alumno.edad,
                    results: alumno.results

                }
            })

    const usuarioModificado = await getUsuarioById(id)

    return usuarioModificado;
}

async function borrarAlumno(id) {
    const connectiondb = await conn.getConnection();
    const usuario = await getUsuarioById(id)
    if (!usuario || !(usuario.rol === 'alumno')) {
        throw new Error('No existe alumno para ese id')
    }
    return await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .deleteOne({ _id: new objectId(id) });
}

async function getTodosAlumnos() {
    const connectiondb = await conn.getConnection();
    const usuarios = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .find()
        .toArray();
    return usuarios;
}

// ARGEGAR CURSOS AL ALUMNO

async function agregarCursoAlumno(idUsuario, curso) {

    const connectiondb = await conn.getConnection();
    const usuario = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .findOne({ _id: new objectId(idUsuario) });


    usuario.results.push(curso)
    const result = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .updateOne({ _id: new objectId(idUsuario) }, { $set: { results: usuario.results } });
    return usuario;
}

// BORRAR LOS CURSOS DEL ALUMNO
async function borrarCursoAlumno(id, data) {

    const connectiondb = await conn.getConnection();
    const usuario = await getUsuarioById(id)
    const result = await usuario.results

    let index = result.findIndex(resultado => resultado.examen_id === data)
    if (index == -1) throw new Error('curso no encontrado')
    result.splice(index, 1)

    const usuarioActualizado = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .updateOne({ _id: new objectId(id) }, { $set: { results: result } })




    return result;
}


// AGREGAR ADMINISTRADOR
async function agregarAdmin(admin) {

    const connectiondb = await conn.getConnection();
    const usuario = await getUsuarioByEmail(admin.email)

    if (usuario) {

        throw new Error('Ya hay un mail registrado')
    }

    admin.password = await bcrypt.hash(admin.password, 8);
    const alumnoNuevo = {
        ...admin,
        rol: 'administrador',
        results: []
    }
    const result = await connectiondb
        .db(DATABASE)
        .collection(USUARIOS)
        .insertOne(alumnoNuevo);
    return result;
}



module.exports = {
    findByCredentials, getUsuarioByEmail, getUsuarioById, agregarAlumno,
    actualizarAlumno, borrarAlumno, getTodosAlumnos, agregarCursoAlumno, borrarCursoAlumno,agregarAdmin
};