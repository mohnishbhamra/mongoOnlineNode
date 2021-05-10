const express = require('express');
const router = express.Router();
const PersonModel = require('../models/personModel');

router.get('/',(req,res)=>{
    var msg = "we are on person router";
    console.log(msg);
    res.send(msg);
})


router.post('/',(req,res)=>{
    var msg = "we are on person router post"+req.body;
    console.log(msg);
    res.send(msg);
})

module.exports = router;