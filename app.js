const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path =require('path');
const app = express();
const cors = require("cors");


dotenv.config({ path: "./config.env" });
require('./db/conn');

app.use(express.json());
app.use(cors());
//make router file
app.use(require('./router/auth'));

//for deployment
app.use(express.static(path.join(__dirname,'./client/build')))

app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'));
});



const LDB = "mongodb://localhost:27017/players";

const PORT = process.env.PORT || 8081;



app.listen(PORT, () => {
    console.log("server is running on pot no ${PORT}");
});