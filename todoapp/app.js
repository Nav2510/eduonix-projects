const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

//Port
const port = 3000;

//Init app
const app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Fetching credentials from credential.json for connecting to MongoDB Atlas cloud
fs.readFile('./public/credential.json',{encoding: 'utf-8'}, (error, file) => {
  if (error) {
    throw error;
  }
  const credentialJSON = JSON.parse(file);
  //mongodb+srv://admin:<password>@nodejs-project-cluster-pzsnr.mongodb.net/test?retryWrites=true
  const uri = "mongodb+srv://"+credentialJSON.user+":"+credentialJSON.pass+"@nodejs-project-cluster-pzsnr.mongodb.net/test?retryWrites=true";
  const client = new MongoClient(uri, { useNewUrlParser: true });

  //Connecting to mongodb client
  client.connect((err, database) => {
    console.log('MongoDB Atlas Connected...');
    if (err) throw err;

    Todos = client.db("todoAppDb").collection("todos");

    app.listen(port, () => {
      console.log('Server running on port '+ port);
    });;
  });
});

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//View Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  Todos.find({}).toArray((err, todos) => {
    if (err) {
      return console.log(err);
    }
    res.render('index', {
      todos : todos
    });
  });
});

app.post('/todo/add', (req, res, next) => {
  //Create Todo
  const todo = {
    text : req.body.text,
    body : req.body.body
  };

  //Insert Todo
  Todos.insertOne(todo, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo added');
    res.redirect('/');
  });
});

app.delete('/todo/delete/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)};
  Todos.deleteOne(query, (err, response) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo deleted');
    res.send(200);
  });
});

app.get('/todo/edit/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)};
  Todos.find(query).next((err, todo) => {
    if (err) {
      return console.log(err);
    }
     res.render('edit', {
       todo : todo
    });
  });
});

app.post('/todo/edit/:id', (req, res, next) => {
  const query = {_id : ObjectID(req.params.id)};
  const todo = {
    text : req.body.text,
    body : req.body.body
  };
  Todos.updateOne(query, {$set :todo}, (err, response) => {
    if (err) {
      return console.log(err);
    }
    console.log('Todo Edited...');
    res.redirect('/');
  });
});
