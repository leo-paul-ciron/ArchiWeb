const mongoose = require('mongoose');
const Projet = require('./Projet.model');
const utilisateur = require('./Utilisateurs.model')

// Modèle pour la table Competences
const competenceSchema = new mongoose.Schema({
    idProf : { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    nom: { type: String, required: true },
    niveau: { type: Number, required: true },
    dateCreation: {type: Date, required: true}
});

const competence = mongoose.model('competence', competenceSchema);

module.exports = competence;