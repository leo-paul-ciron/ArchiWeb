const mongoose = require('mongoose');
const utilisateur = require('./Projet.model');

// Modèle pour la table Gestion
const gestionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    action: { type: String, required: true },
    id_Admin: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    id_CompteGerer: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
});

const gestion = mongoose.model('gestion', gestionSchema);

module.exports = gestion;