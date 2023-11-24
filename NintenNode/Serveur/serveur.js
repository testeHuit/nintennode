//Imports
const express = require('express');

// Instantiate server
const serveur = express();

//configurer les routes
serveur.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Ouaf ouaf!</h1>');
});
// get => récupérer info serveur
// req => request : client vers serveur (paramètres url etc)
// res => response : serveur vers client (ici, il renvoie un texte html)
// status = 200 car il s'agit du "succès de la requête"
// ici, function est mis comme un "paramètre", fonction callback
//

serveur.listen(8080, function() {
    console.log('Je t écoute ouaf !');
});