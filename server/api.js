const express = require('express');
const router = express.Router();
const _ = require("underscore");
const https = require("https");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var concat = require('concat-stream');

parser.on('error', function(err) { console.log('Parser error', err); });

/* GET api listing. */
router.get('/', (req, res) => {
    const data = require('./mir.json');
    res.json(data);
});

router.get('/:docId', (req, res) => {
    const getDocumentURL = "https://www.db-thueringen.de/api/v1/objects/" + req.params.docId;
    let originalRes = res;
    let xmlData = "";
    https.get(getDocumentURL, (res) => {

        res.pipe(concat(function(buffer) {
            var str = buffer.toString();
            originalRes.send(str);
            // parser.parseString(str, function(err, result) {
            //     originalRes.json(result);
            // });
        }));
        // res.on('data', (d) => {
        //     originalRes.send(d);
        // });

        res.on('error', (e) => {
            console.log(e);
        });
    });
    // const data = require('./mir.json');
    // for(let i = 0; i < data.length; i++) {}
    // var result = _.where(data.documents, {"id": req.params.docId});
    // if (result != undefined && result.length > 0) {
    //     res.json(result[0]);
    // }
    // else {
    //     res.status(404);
    //     res.send("Not found!");
    // }
});

module.exports = router;