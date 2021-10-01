// Gestion des utilisateurs | BDD : 'memory-game-db' | Collection : 'games'

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const maDB = 'memory-game-db';

function addGame(newGame) {
    newGame = function(gameName, creator, nbOfCards, timer, cardsFrontStyle, cardsBackColor) {
        class GameCreator {
            constructor(gameName, creator = 'inconnu', nbOfCards = 18, timer = 15, cardsFrontStyle = classic, cardsBackColor = '01') {
                this.gameName = gameName || 'partie ' + uuidv4().slice(0,6);
                this.creator = creator;
                this.nbOfCards = nbOfCards;
                this.lapTime = timer + 's';
                this.cardsList = [
                    {id: '01', src: 'img/cards/' + cardsFrontStyle + '/01.svg'},
                    {id: '02', src: 'img/cards/' + cardsFrontStyle + '/02.svg'},
                    {id: '03', src: 'img/cards/' + cardsFrontStyle + '/03.svg'},
                    {id: '04', src: 'img/cards/' + cardsFrontStyle + '/04.svg'},
                    {id: '05', src: 'img/cards/' + cardsFrontStyle + '/05.svg'},
                    {id: '06', src: 'img/cards/' + cardsFrontStyle + '/06.svg'},
                    {id: '07', src: 'img/cards/' + cardsFrontStyle + '/07.svg'},
                    {id: '08', src: 'img/cards/' + cardsFrontStyle + '/08.svg'},
                    {id: '09', src: 'img/cards/' + cardsFrontStyle + '/09.svg'}
                ];
                this.cardsBackColor = {
                    src: 'img/cards/back/' + cardsBackColor + '.svg'
                };
            }
        
            // static staticMethod() {
            // }
        };
    
        let createdGame = new GameCreator(gameName, creator, nbOfCards, timer, cardsFrontStyle, cardsBackColor);
        return createdGame;
    };

    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        else { console.log('successfully connected to the database'); }

        // Ajout d'une nouvelle partie à la base de données
        client.db(maDB).collection('games').insert(createdGame, (err) => {
            if (err) throw err;
            else { console.log(`La partie a bien été enregistrée !`); }
        });
        client.close();
    });
};

// function deleteGame(gameId) {
//     MongoClient.connect(url, (err, client) => {
//         if (err) throw err;
//         else { console.log('successfully connected to the database'); }
    
//         // Suppression d'une partie de la base de données
//         client.db(maDB).collection('games').deleteOne({'_id': gameId}, (err) => {
//             if (err) throw err;
//             else { console.log(`La partie a bien été supprimée !`); }
//         });
//         client.close();
//     });
// };

module.exports.addGame = addGame;
// module.exports.deleteGame = deleteGame;