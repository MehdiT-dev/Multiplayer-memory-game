const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
// const pug = require('pug');

// Indication pour l'utilisation d'un moteur de templates
app.set('view engine', 'pug');
app.set('views', './templates');

let viewOptions = {};

// Déclarations des dossiers de fichiers statiques
app.use('/css', express.static(__dirname + '/src/assets/css'));
app.use('/js', express.static(__dirname + '/src/assets/js'));
app.use('/img', express.static(__dirname + '/src/assets/images'));

// app.get('/', (req,res) => {
//     res.sendFile('index.html', {root: 'src'}, (err) => {
//         if (err) {console.log(err) }
//         else {console.log(`Fichier index.html envoyé !`)}
//     });
// });
// Pug version
app.get('/', (req,res) => {
    viewOptions = {
        title: 'Hello',
        message: 'You !'
    }
    res.render('index.pug', viewOptions);
});
app.listen(8081, () => {
    console.log('App started and listening on port 8081');
});

const websocketServer = require('websocket').server;
const httpServer = http.createServer();

const {v4: uuidv4} = require('uuid');

httpServer.listen(8080, () => {
    console.log(`App started and listening on port 8080`);
});

// Hashmap clients
const clients = {};

const wsServer = new websocketServer({
    'httpServer': httpServer
});
wsServer.on('request', request => {
    // Connect
    const connection = request.accept(null, request.origin);
    connection.on('open', () => {
        console.log('opened !');
    });
    connection.on('close', () => {
        console.log('closed !');
    });
    connection.on('message', message => {
        const result = JSON.parse(message.utf8Data);
        // Message from the client
        console.log(result);
    });

    // Generate a new client Id
    const clientId = uuidv4();
    clients[clientId] = {
        'connection': connection
    };

    const payLoad = {
        'method': 'connect',
        'clientId': clientId
    };

    // Send back the client connect
    connection.send(JSON.stringify(payLoad));
});