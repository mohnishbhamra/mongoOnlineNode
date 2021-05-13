const express = require('express');
const router = express.Router();
const PersonModel = require('../models/personModel');
const pincodeToEmailListModel = require('../models/mainModel');
const emailToPincodeModel = require('../models/emailToPincode');

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

router.get('/upgrade', async (req, res) => {
    var msg = "getting all person";
    console.log(msg);
    try {
        var allPersonData = await PersonModel.find();
        for(var i=0;i<allPersonData.length;i++){
            var person = allPersonData[i];
            var query = {"_id":person.id};
            var value = {nameObjectList:{
                email:person.email,
                name:person.name
            }}
            await PersonModel.updateOne(query,value);
        }
        res.send(allPersonData);
    } catch (exception) {
        console.error(exception);
        res.status(400).json(exception);
    }

    res.send(msg);
})

router.get('/mainData', async (req, res) => {
    var msg = "getting all person";
    console.log(msg);
    try {
        var allPersonData = await pincodeToEmailListModel.find();
        res.send(allPersonData);
    } catch (exception) {
        console.error(exception);
        res.status(400).json(exception);
    }

    res.send(msg);
})

router.get('/upgradeMain', async (req, res) => {
    var msg = "getting all person";
    console.log(msg);
    try {
        var allemailToPincodeData = await emailToPincodeModel.find();
        var allemailToPincodeDataMap = {};
        for (var i = 0; i < allemailToPincodeData.length; i++) {
            var record = allemailToPincodeData[i];
            allemailToPincodeDataMap[record.email] = record.id;
        }

        var allpincodeToEmailData = await pincodeToEmailListModel.find();
        for (var i = 0; i < allpincodeToEmailData.length; i++) {
            var allpincodeToEmailDataRecord = allpincodeToEmailData[i];
            var query = { "pincode": allpincodeToEmailDataRecord.pincode };
            var emailList = allpincodeToEmailDataRecord.emailList;
            var emailObjectListValueArray = [];
            for (var j = 0; j < emailList.length; j++) {
                var email = emailList[j];
                emailObjectListValueArray.push({
                    "email": email,
                    "id": allemailToPincodeDataMap[email]
                })
            }
            var value = { "emailObjectList": emailObjectListValueArray }
            await pincodeToEmailListModel.updateOne(query, value);
        }

        var newData = await pincodeToEmailListModel.find();
        res.send(newData);
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
    var id = req.param("id");
    var deleteQuery;
    if(name){
        var msg = "deleting person by name" + name;
        deleteQuery = {"name":name};
        console.log(msg);
    }else{
        var msg = "deleting person by id" + id;
        deleteQuery = {"_id":id};
        console.log(msg);
    }
    
    try {
        var allPersonData = await PersonModel.deleteOne(deleteQuery);
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