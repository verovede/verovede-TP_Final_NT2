const jwt = require('jsonwebtoken');
const usuarios = require('../data/Usuarios');

const checkRols = (...roles) => async (req, _res, next) => {
  
  const mail = req.body.email;
  console.log(...roles, mail)
    try{
      const mail = req.body.email;
      //const response = jwt.verify(token, process.env.SECRET);
      const user = await usuarios.getUsuarioByEmail(mail);
      console.log('user')
      console.log(user)
      if (roles.includes(user.rol)) {
        next();
      } else {
        _res.status(401).send({error: 'No está autorizado'});
      }
    } catch(e){
        _res.status(500).send({error: 'No está autorizado2'});
    }    
};

module.exports = {checkRols};