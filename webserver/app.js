const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', (req, res) => {
  let users = [
    {
      first_name : 'Nav',
      last_name : 'Singh',
      age : 23,
      gender : 'male'
    },
    {
      first_name : 'Tom',
      last_name : 'Riddle',
      age : 14,
      gender : 'male'
    },
    {
      first_name : 'Lucy',
      last_name : 'Martha',
      age : 23,
      gender : 'female'
    }
  ];

  res.json(users);
});

app.get('/download', (req, res) =>  {
  res.download(path.join(__dirname, '/downloads/img.jpg'));
});

app.get('/about', (req, res) =>  {
  res.redirect('/about.html');
});

app.post('/form-submit', (req, res) => {
  let email = req.body.email;

  console.log(email);
});

app.listen(3000, () => {
  console.log('Server started on port: 3000');
});
