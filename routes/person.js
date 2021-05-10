const express = require('express');
const router = express.Router();
const PersonModel = require('../models/personModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    var msg = "we are on person router";
    console.log(msg);
    try{
        var allPersonData = await PersonModel.find();
        res.send(allPersonData);
    }catch(exception){
        console.error(exception);
        res.status(400).json(exception);
    }
    
    res.send(msg);
})


router.post('/', (req, res) => {
    var bodyJSON = req.body;
    var msg = "we are on person router post" + JSON.stringify(bodyJSON);
    console.log(msg);
    console.log("creating 1st entry");
    var personDataModel = new PersonModel({
        email: bodyJSON.email,
        name: bodyJSON.name
    })

    personDataModel.save().then(result => {
        var createMsg = "created" + JSON.stringify(result);
        console.log(createMsg);
        res.send(createMsg);
    }, reject => {
        var rejectMsg = "caught reject " + reject;
        console.error(rejectMsg);
        res.status(400).send(rejectMsg);
    }).catch(err => {
        var errorMsg = "caught error" + err;
        console.error(errorMsg);
        res.status(400).send(createMsg);
    })

})

module.exports = router;