'use strict';

var cluster = require('cluster');

if (cluster.isMaster) {
    var os = require("os");
    var i;
    console.log('Creating forks for each cpu:', os.cpus().length, 'found.');

    for (i = 0; i < 2; ++i) {
        cluster.fork();
    }
} else {
    var
        fs = require("fs"),
        express = require('express'),
        site = express();

    site.configure(function () {
    });

    // Use Compression (gzip)
    site.use(express.compress());

    // Serve static files
    site.use('/src', express.static(__dirname + '/src'));

    site.get('/api/submissions/1', function (req, res) {
        res.send('{"id": "1", "type": "Principal", "description": "2013 RENEWAL", "accountName": "MISSOURI BEER WHOLESALER RISK MANAGEMENT ASSOCIATION", "userAdded": "conijxn1"}');
    });

    site.get('/api/submissions/1/entity/summary', function (req, res) {
        res.send('{"title":"entity","imported":13,"matched":9,"confirmed":0,"fuzzy":2,"unmatched":2}');
    });

    site.get('/api/submissions/1/importHistory', function (req, res) {
        res.send('[{"type":"Principal","when": "03/01/13 7:07 AM","importedEntities": 13},{"type":"Principal","when": "03/03/13 3:27 PM","importedEntities": 10}]');
    });

    site.get('/api/submissions/1/entities/fuzzy', function (req, res) {
        res.send('[{"id" : "1", "externalId": "1","effectivityStart" : "05/01/2013","effectivityEnd" : "05/01/2014", "legalName": "KEYHOLE SOFTWARE, LLC", "shortName": "KEYHOLE SOFTWARE", "currentState": "fuzzy"},' +
            '{"id" : "2", "externalId": "2","effectivityStart" : "02/01/2013","effectivityEnd" : "02/01/2014", "legalName": "DIGITAL CHALK", "shortName": "DIGITAL CHALK", "currentState": "fuzzy"}]');
    });

    site.get('/api/submissions/1/entities/unmatched', function (req, res) {
        res.send('[{"id" : "3", "externalId": "3","effectivityStart" : "05/01/2013","effectivityEnd" : "05/01/2014", "legalName": "BOBS SHOES", "shortName": "BOBS SHOES", "currentState": "unmatched"},' +
            '{"id" : "4", "externalId": "4","effectivityStart" : "02/01/2013","effectivityEnd" : "02/01/2014", "legalName": "MISSOURI BEER", "shortName": "MISSOURI BEER", "currentState": "unmatched"}]');
    });

    site.get('/api/submissions/1/entities/1', function (req, res) {
        res.send('[{"id" : "1", "externalId": "1","effectivityStart" : "05/01/2013","effectivityEnd" : "05/01/2014", "legalName": "KEYHOLE SOFTWARE", "shortName": "KEYHOLE SOFTWARE"}]');
    });

    site.get('/api/submissions/1/entities/2', function (req, res) {
        res.send('[{"id" : "2", "externalId": "2","effectivityStart" : "02/01/2013","effectivityEnd" : "02/01/2014", "legalName": "DIGITAL CHALK, LLC", "shortName": "DIGITAL CHALK"}]');
    });

// Ensure all routes go home, client side app..
    site.get('/submissions/*', function (req, res) {
        fs.createReadStream("index.html").pipe(res);
    });

    site.get('/401.html', function (req, res) {
        res.status(401).sendfile('src/401.html');
    });

// Ensure all other routes are not found.
    site.get('/*', function (req, res) {
        res.status(404).sendfile('src/404.html');
    });

//site.use(express.logger())

// Actually listen
    site.listen(8081);
}
