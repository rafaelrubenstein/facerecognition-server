const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
require('dotenv').config();

const PORT = process.env.PORT;
const PG_DATABASE = process.env.PG_DATABASE;
const PG_USER = process.env.PG_USER;
const PG_HOST = process.env.PG_HOST;
const PG_PASSWORD = process.env.PG_PASSWORD;

const DB = knex({
    client: 'pg',
    connection: {
        host: PG_HOST ,
        user: PG_USER,
        password: PG_PASSWORD,
        database: PG_DATABASE
    }
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/signin', (req, res) => {signin.signinUser(req,res,DB,bcrypt)});
app.post('/register', (req, res) => {register.registerUser(req,res,DB,bcrypt)});
app.put('/image', (req, res) => { image.updateImage(req,res,DB)});
app.post('/imagedata', (req,res)=> {image.imageData(req,res)})
app.listen(PORT, () => {  });
 
/*
not needed yet, possibly never needed

app.get("/", (req, res) => {
  DB.select().table('users').then(data => res.json(data))
});


might be useful in future

app.get('/profile/:id', (req, res) => {
        const { id } = req.params;
        
    });*/


   
