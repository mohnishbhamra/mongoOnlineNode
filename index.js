require('dotenv').config();
const DB_URL = process.env.DB_CONNECTION_URL;
const e = require('express');
const express = require('express');
const mongoose = require('mongoose');
var port = process.env.PORT || 3001;
const DB_CONNECTION_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};
mongoose.connect(DB_URL, DB_CONNECTION_OPTIONS).then(
    res=>{
        console.log("connected to db");
        app.listen(port, () => {
            console.log("listening at port-" + port);
        })
        
    }
).catch(
    err=>{
        console.error("db connection failed"+err);
    }
);
const app = express();

app.get('/', (req, responseObject) => {
    responseObject.send({ "message": "hello" });
})



