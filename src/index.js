const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose} = require('./database'); // solo el metodo mongoose

const app = express(); // app sera nuestro servidor

// Settings 
app.set('port', process.env.PORT || 3000)

// Middlewares -son funciones que se ejecutan antes de que lleguen a las rutas
app.use(morgan('dev'))
app.use(express.json()); //si lo es accedemos a el

// Routes
// app.use(require('./routes/task.routes'));
app.use('/api/tasks' ,require('./routes/task.routes'));

//Static files - html css js en public

app.use(express.static(path.join(__dirname, 'public'))); // mi carpeta estatica esta en esta direccion

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
});