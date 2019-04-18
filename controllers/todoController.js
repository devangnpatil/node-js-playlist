var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect mongodb
mongoose.connect('mongodb+srv://devangnpatil:devangnpatil@cluster0-ucesq.mongodb.net/test?retryWrites=true')

// Create a blue prints
var todoSchema = new mongoose.Schema({
    item: String,
    id: Number
});

var Todo = mongoose.model('Todo', todoSchema );

// var itemOne = Todo({item:'Driver', id:999}).save(function(err){
//     if(err){
//         throw err;
//     }else{
//         console.log('Item saved');
//     }
// })

var urlencoderParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
});

app.post('/todo', urlencoderParser, function(req, res){
    data.push(req.body);
    res.json(data);
});

app.delete('/todo/:id', function(req, res){
    data = data.filter(function(todo){
        return todo.id !== req.params.id;
    })
    res.json(data);
});

};
