const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    var msg = "we are on person router";
    console.log(msg);
    res.send(msg);
})

module.exports = router;