const mongoose = require('mongoose');
const Projet = require('./Projet.model');
const utilisateur = require('./Utilisateurs.model');
const competence = require('./Competences.model');

// Modèle pour la table Competences
const lieSchema = new mongoose.Schema({
    idCompetenceParent : { type: mongoose.Schema.Types.ObjectId, ref: 'competence', required: true },
    idCompetenceEnfant : { type: mongoose.Schema.Types.ObjectId, ref: 'competence', required: true },
});

const lie = mongoose.model('lie', lieSchema);

module.exports = lie;