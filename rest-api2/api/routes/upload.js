const express = require('express');
const app = express.Router();

const fileupload = require("express-fileupload");
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.post('/', (req, any, res) => {
    console.log(req.files);
    // handle the file here
    var file = req.files.File;
    var fileName = file.name;
    file.mv('../../uploads', fileName, function(err) {
        if(err) {
            res.send(err);
        } else {
            res.send("File uploaded")
        }
    });
    res.sendStatus(200);
});

module.exports = app;