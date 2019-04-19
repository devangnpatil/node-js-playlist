var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://devangnpatil:devangnpatil@cluster0-ucesq.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object

//     var todoSchema = new mongoose.Schema({
//         item: String,
//         id: Number
//     });

//     var Todo = mongoose.model('Todo', todoSchema ); 
    
//     client.close();
// });


// Connect mongodb
mongoose.connect('mongodb+srv://devangnpatil:devangnpatil@cluster0-ucesq.mongodb.net/test?retryWrites=true')

var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

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
    // get data from mongo db and pass it to View
    Todo.find({}, function(err, data){
        if(err) throw err
        res.render('todo', {todos: data});
    });
});



app.post('/todo', urlencoderParser, function(req, res){
    // get data from view and pass it to db
    var newToo = Todo(req.body).save(function(err, data){
        if(err) throw err
        res.json(data);
    });
});

app.delete('/todo/:id', function(req, res){
    // Delete requested id from mongo db;
    Todo.find({id:req.params.id}).remove(function(err, data){
        if(err) throw err
        res.json(data)
    });
    // data = data.filter(function(todo){
    //     return todo.id !== req.params.id;
    // })
    // res.json(data);
});

};
