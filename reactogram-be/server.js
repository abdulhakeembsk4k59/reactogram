const express = require('express');
const PORT = 5000;
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const {MONGO_DB_URL} = require('./config');

mongoose.connect(MONGO_DB_URL);

mongoose.connection.on('connected', ()=>{
    console.log("Connected to Database successfully..!");
})

mongoose.connection.on('error', (error)=>{
    console.log("some error while connecting to Database!.");
})

app.use(cors());
app.use(express.json());

require('./models/user_model');
require('./models/post_model');

app.use(require('./routes/user_route')); 
app.use(require('./routes/post_route')); 
app.use(require('./routes/file_route')); 

app.listen(PORT, ()=>{
    console.log("Server started on port",PORT);
})