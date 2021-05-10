const express = require('express');
const router = express.Router();
const PersonModel = require('../models/personModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    var msg = "we are on person router";
    console.log(msg);
    res.send(msg);
})


router.post('/',(req,res)=>{
    var msg = "we are on person router post"+JSON.stringify(req.body);
    console.log(msg);
    res.send(msg);
})

module.exports = router;