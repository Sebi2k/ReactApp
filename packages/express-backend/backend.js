import express from "express";
import cors from "cors";
import User from "./user.js"
import {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
  } from "./user-services.js"

const app = express();
const port = 8000;
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

function deleteUserById(id) {
    const index = users['users_list'].findIndex( (user) => user['id'] === id)
    if (index === -1) {return false};
    return users['users_list'].splice(index, 1);
    }

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByNameAndJob = (name, job) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name && user['job'] === job); 
}

function randomId(){
  // Generate 3 random lowercase letters
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomLetters = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomLetters += letters.charAt(randomIndex);
  }

  // Generate 3 random numbers
  const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  // Combine the letters and numbers
  const randomID = randomLetters + randomNumbers;
  
  return randomID;
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const addUser = (user) => {
    user.id = randomId();
    users['users_list'].push(user);
    return user;
}

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if(name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = deleteUserById(id);
    if (result === undefined || result === false) {
        res.status(404).send('Resource not found.');
    } else {
        res.status(204).send(result);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});      