const express = require('express');
const app = express.Router();

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.post('/', (req, res, next) => {
    console.log('post req entered');
    // handle the file here
    var file = req.files.inputFile;
    file.mv(`${__dirname}../../../uploads/${file.name}`, err => {
    if (err) {
        console.error(err);
        return res.status(500).send(err);
    }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

module.exports = app;