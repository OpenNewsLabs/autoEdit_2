
const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints')

const demoTranscriptions = require('../../electron/demo_transcription.json');
const demoPaperedit = require('../../electron/demo_paperedit.json');
const demoPaperedits = [];
demoPaperedits.push(demoPaperedit);

// https://www.npmjs.com/package/express-fileupload

const app = express()
//https://stackoverflow.com/questions/31496100/cannot-app-usemulter-requires-middleware-function-error
app.use(multer({dest:__dirname+'/uploads/'}).any());
// create application/json parser
var jsonParser = bodyParser.json()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 
// parse application/json
app.use(bodyParser.json())

// enable cross-origin resource sharing
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Optinal, Serve the backbone app
// app.use('/', express.static(path.join(__dirname, '../docs/demo')))
app.use('/', express.static(path.join(__dirname, '../client')))

// programmatically  returns all registered routes within this server
app.get('/routes', (req, res) => {
    console.info('Routes');
    res.json({
        routes: listEndpoints(app)
        })
})

/**
 * Transcriptions
 */

// New Transcription 
// handle file upload
// http://nauvalatmaja.com/2015/01/30/upload-files-with-backbone.js-node.js-and-express-4.x/
app.post('/api/transcriptions', jsonParser, function (req, res) {
    console.info('New Transcription');
    console.log(req.body);
    console.dir(req.file);
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    res.json({ res: 'POST request create new transcription', receive: req.body});
   
})

// list Transcriptions 
app.get('/api/transcriptions', jsonParser, function (req, res) {
    console.info('list Transcriptions');
    // console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    // res.json({ res: 'GET request list transcriptions', receive: req.body});
    res.status(201).json(demoTranscriptions);
})

// // Show Transcriptions 
// // not used because backbone feteches all collection and then works with it there
app.get('/api/transcriptions/:id', jsonParser, function (req, res) {
    console.info('Show Transcriptions Transcription');     
    var transcriptionId = parseInt(req.params.id);
    console.log(transcriptionId);
    console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    // res.json({ res: 'GET request list transcriptions', id: transcriptionId, receive: req.body});
    res.status(201).json(demoTranscriptions[transcriptionId]);
})

// Updated Transcription
app.put('/api/transcriptions/:id', jsonParser, function (req, res) {
    console.info('Updated Transcription');
    var transcriptionId = req.params.id;
    console.log(transcriptionId);
    console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    res.json({ res: 'GET request update', id: transcriptionId, receive: req.body});
})

// Delete Transcription 
app.delete('/api/transcriptions/:id', jsonParser, function (req, res) {
    console.info('Delete Transcription');
    var transcriptionId = req.params.id;
    console.log(transcriptionId);
    console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    res.json({ res: 'GET request delete', id: transcriptionId});
})

/**
 * Paperedits
 */


 // New Paperedits 
app.post('/api/paperedits', jsonParser, function (req, res) {
    console.info('New Paperedits');
    console.log(req.body)
    demoPaperedits.push(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    res.status(201).json({ res: 'POST request create new paperedit', receive: req.body});
})

// List Paperedits 
app.get('/api/paperedits', jsonParser, function (req, res) {
    console.info('List Paperedits');
    // console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    // res.json({ res: 'GET request list transcriptions', receive: req.body});
    res.status(200).json(demoPaperedits);
})

// Delete Transcription 
app.delete('/api/paperedits/:id', jsonParser, function (req, res) {
    console.info('Delete Paperedit');
    var paperEditId = req.params.id;
    console.log(paperEditId);
    console.log(req.body)
    if (!req.body) return res.sendStatus(400)
    // create user in req.body
    res.json({ res: 'GET request delete', id: paperEditId});
})

/**
 * Setup server
 */


app.listen(3000, () => console.log('Example app listening on port 3000!'))


// app.use(express.static('../docs')); // Serve static files from public (e.g http://localhost:8080/index.html)
// app.use(express.errorHandler({dumpExceptions: true, showStack: true})); // Dump errors

// // Add score
// app.post('/api/scores', function(req, res) {
//     var score = req.body;
//     score.id = Date.now().toString(); // You probably want to swap this for something like https://github.com/dylang/shortid

//     // db.collection('scores').insert(score, {safe: true}).done(function(score) {
//     //     res.json(score, 201);
//     // });
// });

// // List scores (accepts skip and limit query parameters)
// app.get('/api/scores', function(req, res) {
//     // db.collection('scores').find().skip(req.query.skip || 0).limit(req.query.limit || 0).toArray().done(function(scores) {
//     //     res.json(scores);
//     // });
// });

// // Read score
// app.get('/api/scores/:id', function(req, res) {
//     // db.collection('scores').findOne({id: req.params.id}).done(function(score) {
//     //     res.json(score);
//     // });
// });

// // Update score (supports partial updates, e.g only send one field or all)
// app.put('/api/scores/:id', function(req, res) {
//     var score = req.body;

//     // db.collection('scores').update({id: req.params.id}, {$set: score}, {safe: true}).done(function(success) {
//     //     res.json(success ? 200 : 404);
//     // });
// });

// // Delete score
// app.del('/api/scores/:id', function(req, res) {
//     // db.collection('scores').remove({id: req.params.id}, {safe: true}).done(function(success) {
//     //     res.json(success ? 200 : 404);
//     // });
// });

// app.listen(8080);