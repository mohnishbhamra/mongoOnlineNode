const e = require('express');
const express = require('express');
const app = express();

app.get('/', (req, responseObject) => {
    responseObject.send({ "message": "hello" });
})

var port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("listening at port" + port);
})

