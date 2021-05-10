const express = require('express');
const router = express.Router();
const PersonModel = require('../models/personModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    var msg = "getting all person";
    console.log(msg);
    try {
        var allPersonData = await PersonModel.find();
        res.send(allPersonData);
    } catch (exception) {
        console.error(exception);
        res.status(400).json(exception);
    }

    res.send(msg);
})

router.get('/specificPerson', async (req, res) => {
    var id = req.param("id");
    if (id) {

        var msg = "getting specific person for id->" + id;
        console.log(msg);
        try {
            var allPersonData = await PersonModel.findById(id);
            res.send(allPersonData);
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    } else {
        var name = req.param("name");
        var msg = "getting specific person for name->" + name;
        console.log(msg);
        try {
            var allPersonData = await PersonModel.find({ "name": name });
            res.send(allPersonData);
        } catch (exception) {
            console.error(exception);
            res.status(400).json(exception);
        }
    }


})


router.put('/', async (req, res) => {
    var name = req.param("name");
    var email = req.param("email");
    var msg = "updating person- " + name + " email-" + email;
    console.log(msg);
    try {
        var query = { "name": name };
        var updatedValue = { "email": email };
        var allPersonData = await PersonModel.updateOne(query, updatedValue);
        res.send(allPersonData);
    } catch (exception) {
        console.error(exception);
        res.status(400).json(exception);
    }

    res.send(msg);
})

router.delete('/', async (req, res) => {
    var name = req.param("name");
    var msg = "deleting person by name" + name;
    console.log(msg);
    try {
        var allPersonData = await PersonModel.deleteOne({"name":name});
        res.send(allPersonData);
    } catch (exception) {
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