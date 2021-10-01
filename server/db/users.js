// Gestion des utilisateurs | BDD : 'memory-game-db' | Collection : 'users'

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const maDB = 'memory-game-db';

function addUser(newUser) { 
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        else { console.log('successfully connected to the database'); }
        // Ajout d'un nouvel utilisateur à la base de données
        client.db(maDB).collection('users').insertOne(newUser, (err) => {
            if (err) throw err;
            else { console.log(`L'utilisateur a bien été enregistré !`); }
            client.close();
        });
    });
};

function deleteUser(id) {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        else { console.log('successfully connected to the database'); }
    
        // Suppression d'un utilisateur de la base de données
        client.db(maDB).collection('users').deleteOne({'id': id}, (err) => {
            if (err) throw err;
            else { console.log(`L'utilisateur a bien été supprimé !`); }
            client.close();
        });
    });
};

function userIsUnavailable(newUser) {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        // else { console.log('successfully connected to the database'); }

        // Recherche par pseudo d'un utilisateur existant dans la base de données
        client.db(maDB).collection('users').find({nickname: newUser}).toArray((err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                console.log('Résultats trouvés !');
                return true;
            }
            else {
                console.log('Aucun résultat !');
                return false;
            }
            client.close();
        });
    });
};

module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.userIsUnavailable = userIsUnavailable;