const connectionButton = document.querySelector('#connection-button');
const nicknameInput = document.querySelector('input[name="nickname"]');
const avatarInput = document.querySelector('input[name="avatar"]');

const players = [];
const games = [];

// WEBSOCKET
window.addEventListener('DOMContentLoaded', () => {
    const webSocket = new WebSocket('ws://localhost:8080');
    
    webSocket.addEventListener('open', () => {
        console.log('Connexion WebSocket établie');
        
        connectionButton.addEventListener('submit', (e) => {
            if (nicknameInput.value != "" && nicknameInput.value != null && avatarInput.value != "" && avatarInput.value != null) {
                let newUser = {};
                newUser.object = 'userCreation';
                newUser.nickname = nicknameInput.value;
                newUser.avatarSrc = 'img/' + avatarInput.value + '.png';
                webSocket.send(JSON.stringify(newUser));
                
            } else {
                e.preventDefault();
            }
        });
        
    });
});

// COMMUNICATION MODULE WS DE NODE
// var ws = new WebSocket("ws://localhost:8081");

// connectionButton.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (nicknameInput.value != "" && nicknameInput.value != null && avatarInput.value != "" && avatarInput.value != null) {
//         ws.onopen = function(e) {
//             console.log('Connexion WebSocket établie');

//             userInfos.nickname = nicknameInput.value;
//             userInfos.avatarSrc = 'img/' + avatarInput.value + '.png';

//             ws.send(JSON.stringify(userInfos));

//             console.log('Connection to server opened');
//         }
        
//         function sendMessage() {
//             ws.send($('#message').val());
//         }
//     }
//     else {
//         e.preventDefault();
//     }
// })