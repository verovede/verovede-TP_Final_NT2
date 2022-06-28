var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//AGREGADO
const cors = require('cors')


var indexRouter = require('./routes/Index');
var usuariosRouter = require('./routes/Usuarios');
var examenesRouter = require('./routes/Examenes');
var resultadosRouter = require('./routes/Resultados');
var preguntasRouter = require('./routes/Preguntas');
var videosRouter = require('./routes/Videos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));
//AGREGADO
app.use(cors())

app.use('/', indexRouter);
app.use('/api/', usuariosRouter);
app.use('/api/', examenesRouter);
app.use('/api/', resultadosRouter);
app.use('/api/', preguntasRouter);
app.use('/api/', videosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//AGREGADO




app.get("*", (req, res) => {
  res.redirect("/");
});

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
);
server.on("error", (error) => console.log(`Error en servidor http`, error));


module.exports = app;
