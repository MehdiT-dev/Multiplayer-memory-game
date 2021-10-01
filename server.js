// ExpressJS
const express = require('express');
const app = express();
const PORT = 8080;

// Chargement du module express-session
const session = require('express-session');

// Chargement des modules natifs Node
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Import de modules tiers
const {v4: uuidv4} = require('uuid'); // uuidv4() pour générer un id unique

// Import de modules custom pour gestion BDD
const {deleteUser, userIsUnavailable, addUser} = require('./server/db/users');
const {addGame, deleteGame} = require('./server/db/games');

// Indication pour l'utilisation d'un moteur de templates
app.set('view engine', 'pug');
app.set('views', './templates');

// Création de l'objet contanant les variables des différents fichers pug
let viewOptions = {};

// Déclarations des dossiers de fichiers statiques
app.use('/css', express.static(__dirname + '/src/assets/css'));
app.use('/js', express.static(__dirname + '/src/assets/js'));
app.use('/img', express.static(__dirname + '/src/assets/images'));

// Page d'identification utilisateur
app.get('/', (req,res) => {
    viewOptions = {
        title: 'Hello',
        message: 'You !'
    }
    res.render('registration.pug', viewOptions);
});

// Page d'accueil (créer et/ou rejoindre une partie)
app.post('/', (req,res) => {
    if (req.body.nickname && req.body.avatar) {
        res.locals.nickname = req.body.nickname;
        res.locals.avatarSrc =  req.body.avatar + ".png";
        const userInfos = {
            nickname: req.body.nickname,
            avatarSrc: "img/" + req.body.avatar + ".png",
            id: uuidv4()
        };        
        if (!userIsUnavailable(userInfos.nickname)) {
            addUser(userInfos);
            console.log('userInfos : ', userInfos);
            viewOptions = {
                nickname: res.locals.nickname,
                avatarSrc: res.locals.avatarSrc
            }
            res.render('index.pug', viewOptions);
        } else {
            app.locals.message = {class: 'alert', text: `Ce pseudo n'est pas disponible`};
            res.render('registration.pug');
        }
    } else {
        app.locals.message = {class: 'alert', text: `Veuillez fournir un pseudo et sélectionner un avatar.`};
        res.render('registration.pug', viewOptions);
    }
});
    
// Création d'une nouvelle partie
app.post('/new-game/', (req,res) => {
    // Vérification des différents champs à la création => req.body
    // Si ok, récupération pour les passer en arguments de la fonction d'usine
// ??? Evenement ws pour mettre à jour le tableau ???
// ??? url de la partie = game/name=partie25&id=12456... ???
});

// Accès partie 
app.get('/game', (req,res) => {
    // viewOptions = {
    //     title: 'Hello',
    //     message: 'You !'
    // }
    res.render('game.pug', viewOptions);
});
        
const httpServer = app.listen(PORT, () => {
    console.log(`App started and listening on port ${PORT}`);
});




// WEBSOCKET
const users = [];
const games = [];

const websocket = require('websocket');

const WebSocketServer = websocket.server;

const webSocketServer = new WebSocketServer({
    httpServer: httpServer
});

webSocketServer.on('request', (webSocketRequest) => {
    const socket = webSocketRequest.accept(null, webSocketRequest.origin);
    console.clear();
    console.log('New connexion');
    
    socket.on('message', (data) => {
        const receivedMessage = JSON.parse(data.utf8Data);
        console.log(receivedMessage);
        if (receivedMessage.object == 'userCreation') {
            socket.nickname = receivedMessage.nickname;
            socket.avatarSrc = receivedMessage.avatarSrc;
            socket.id = uuidv4();
            users.push(socket);
            console.log(socket.id)
            console.log(users);
        } else if (receivedMessage.object == 'gameCreation') {
            games.push(receivedMessage);
        }
    });
    
    socket.on('close', (socket) => {
        // Code lorsque connexion perdue
        console.log(`The user ${socket.id} have been deconnected`)
    });
});


// SOCKET.IO
// const socketio = require('socket.io');
// // const server = http.createServer(app);
// // const io = socketio(server);
// const io = socketio(server);

// const players = {};
// const games = {};

// io.on ('connection', function(socket) {
    //     console.log('user connected');
    //     socket.on('identify', (newUser) => {
        //         console.log(newUser);
        //         players[socket.id] = {
            //             id: uuidv4(),
            //             nickname: newUser.nickname,
            //             avatarSrc: newUser.avatarSrc
            //         };
            //     });
            
            //     socket.on('disconnect', function() {
                //         delete players[socket.id];
                //     });
                // });
                
// MODULE WS NODE
                // var WebSocketServer = require('ws').Server;
                // const ws = new WebSocketServer({port: 8081});
                
                // var users = [];
                
                // ws.on('connection', function(socket) {
                //     const user_uuid = uuidv4();
                //     users.push(
                //         {
                //             'ws': ws,
                //             'id': user_uuid,
                //             'nickname': userInfos.nickname,
                //             'avatar': userInfos.avatarSrc
                //         }
                //     );
                //     console.log('user [%s] connected', user_uuid);
                //     console.log(users[0]);
                    
                //     ws.on('message', function(message) {
                //         console.log(message);
                //     });
                // });
                
                // ws.on('close', function() {
                
                // })