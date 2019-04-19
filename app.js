var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

// set up ejs engine

app.set('view engine', 'ejs');

// static filess
app.use(express.static('./public'));

// fire controller
todoController(app);

// redirect the home route to /todo
app.get('/', (req, res) => {
    res.redirect('/todo')
})

// listen to port
app.listen(process.env.PORT || 5000);

console.log(`Server started : http://localhost:${process.env.PORT || 5000}`);
