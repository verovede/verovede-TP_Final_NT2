const usuarios = require('../data/Usuarios');
const jwt = require('jsonwebtoken');

async function getUsuarioByEmail(Email){    
    return usuarios.getUsuarioByEmail(Email);
}

async function getUsuarioById(id){    
    return usuarios.getUsuarioById(id);
}

async function agregarAlumno(alumno){
    return usuarios.agregarAlumno(alumno);
}

async function agregarAdmin(admin){
    return usuarios.agregarAdmin(admin);
}

async function actualizarAlumno(alumno, id){
    return usuarios.actualizarAlumno(alumno, id);
}

async function borrarAlumno(id){    
    return usuarios.borrarAlumno(id);
}

async function getTodosAlumnos(){    
    return usuarios.getTodosAlumnos();
}

async function findByCredential(Email, password){
    return usuarios.findByCredentials(Email, password);
}

async function generateAuthToken(usuarios){
    const token = jwt.sign({_id: usuarios._id}, process.env.SECRET, {expiresIn: '2h'});
    return token;
}

async function agregarCursoAlumno(idUsuario, curso){
    return usuarios.agregarCursoAlumno(idUsuario, curso);
}

async function borrarCursoAlumno(idUsuario, idCurso){
    return usuarios.borrarCursoAlumno(idUsuario, idCurso);
}




module.exports = {findByCredential, generateAuthToken, getUsuarioByEmail, getUsuarioById, agregarAlumno, 
                    actualizarAlumno, borrarAlumno, getTodosAlumnos, agregarCursoAlumno,
                    borrarCursoAlumno, agregarAdmin}