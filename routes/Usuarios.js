var express = require('express');
var router = express.Router();
const controller = require('../controllers/Usuarios');
const {auth} = require('../middleware/auth');
const checkRols = require('../middleware/checkRol');

/* GET api/usuarios */
router.get('/usuarios', async (req, res) => {    
    try{
        const usuarios = await controller.getTodosAlumnos()
        res.status(200).json(usuarios);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* POST api/usuarios/ BODY -> DATOS */
router.post('/usuarios/', async(req, res) => {
    try{
        const usuario = await controller.agregarAlumno(req.body);
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* PUT api/usuarios/:id BODY -> DATOS */
router.put('/usuarios/:id', async(req,res)=>{
    try{
        usuario = await controller.actualizarAlumno(req.body, req.params.id);
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* DELETE api/usuarios/:id */
router.delete('/usuarios/:id', async(req,res)=>{
    try{
        const usuario = (await controller.borrarAlumno(req.params.id));
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

// POST api/usuarios/login BODY -> DATOS
router.post('/usuarios/login', async (req, res) => {
    try {
        const usuario = await controller.findByCredential(req.body.email, req.body.password);
        res.status(200).json(usuario);
      } catch (error) {
        res.status(401).send(error.message);
      }
})

/* GET api/usuarios/consultarUsuarioPorMail/:email */
router.get('/usuarios/consultarUsuarioPorMail/:email',async (req, res) => {
    try{   
        const usuario = await controller.getUsuarioByEmail(req.params.email);
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* GET api/usuarios/consultarUsuario/:id */
router.get('/usuarios/consultarUsuario/:id', async (req, res) => {
    try{
        const usuarios = await controller.getUsuarioById(req.params.id);
        res.status(200).json(usuarios);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* PUT api/usuarios/agregarCursoAlumno/:id BODY -> DATOS */
router.put('/usuarios/agregarCursoAlumno/:id', async(req, res) => {
    try{
        const usuario = await controller.agregarCursoAlumno(req.params.id,req.body)
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* DELETE api/usuarios/borrarCursoAlumno/:id BODY -> DATOS */
router.delete('/usuarios/borrarCursoAlumno/:id', async(req, res) => {
    
    try{        
        const usuario = (await controller.borrarCursoAlumno(req.params.id, req.body.data));
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

// POST api/usuarios/loginAdmin BODY -> DATOS
router.post('/usuarios/loginAdmin', checkRols.checkRols('administrador'),async (req, res) => {
    try {
        const usuario = await controller.findByCredential(req.body.email, req.body.password);
        res.status(200).json(usuario);
      } catch (error) {
        console.log(error, 'no entra')
        res.status(401).send(error.message);
       
      }
})

/* POST api/usuarios/ BODY -> DATOS */
router.post('/usuarios/agregarAdmin', async(req, res) => {
    try{
        const usuario = await controller.agregarAdmin(req.body);
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});





module.exports = router;
