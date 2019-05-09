const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Port
const port = 3000;

//Init app
const app = express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:1654899.Nav@todoapp-pzsnr.mongodb.net/test?retryWrites=true";
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
    console.log(todos);
    res.render('index');

  });
});
