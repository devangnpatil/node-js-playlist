var bodyParser = require('body-parser');

var data = [
];

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
