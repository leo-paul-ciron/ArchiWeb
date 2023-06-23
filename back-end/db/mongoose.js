//fichier faisant le lien entre mongodb et la partie logique.

const mongoose = require('mongoose');
const TypeUtilisateurModel = require('./models/TypeUtilisateur.model');
const utilisateur = require('./models/Utilisateurs.model');

const uri = "mongodb+srv://leopaul:lLp0RDjaFKfAjByb@selfgrader.g7jvkhi.mongodb.net/SelfGrader?retryWrites=true&w=majority";


mongoose.Promise = global.Promise;
// Connect to MongoDB and create/use database called todoAppTest

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB Atlas');
});

module.exports = {
    mongoose
};