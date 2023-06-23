const mongoose = require('mongoose');
const utilisateur = require('./Utilisateurs.model');
const projet = require('./Projet.model');
const competence = require('./Competences.model');

// Modèle pour la table Resultats
const resultatSchema = new mongoose.Schema({
    idEtudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    idCompetence: { type: mongoose.Schema.Types.ObjectId, ref: 'competence', required: true },
    niveauCompetence: { type: Number, required: true }
});

const resultat = mongoose.model('resultat', resultatSchema);

module.exports = resultat;