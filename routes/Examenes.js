const express = require('express');
const router = express.Router();
const controller = require('../controllers/Examenes');
const {auth} = require('../middleware/auth');
const checkRols = require('../middleware/checkRol');

/* GET api/examenes */
router.get('/examenes/', async (req, res) => {    
    try{
        const examenes = await controller.getTodosExamenes();
        res.status(200).json(examenes);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* POST api/examenes BODY -> DATOS */
router.post('/examenes', async(req, res) => {
    try{
        const examen = res.json(await controller.agregarCurso(req.body));
        res.status(200).json(examen);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});


/* GET api/examenes/buscarCurso/:id */
router.get('/examenes/buscarCurso/:id', async (req, res) => {
    try{
        const examen = await controller.buscarCurso(req.params.id);
        res.status(200).json(examen);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});



/* PUT api/examenes/:id BODY -> DATOS */
router.put('/examenes/:id', async(req,res)=>{
    try{
        const examen = await controller.actualizarExamen(req.body, req.params.id);
        res.status(200).json(examen);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});

/* DELETE api/examenes/:id */
router.delete('/examenes/:id', async(req,res)=>{
    try{
        const examen = await controller.borrarExamen(req.params.id);
        res.status(200).json(examen);
    }catch(err){
        res.status(400).send('Error ' + err.message)
    }
});




module.exports = router;