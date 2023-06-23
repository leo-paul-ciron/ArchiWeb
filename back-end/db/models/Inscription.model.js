const mongoose = require('mongoose');
const utilisateur = require('./Utilisateurs.model');
const projet = require('./Projet.model');

const inscriptionSchema = new mongoose.Schema({
    idProjet: { type: mongoose.Schema.Types.ObjectId, ref: 'projet', required: true },
    idEtudiant: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
    dateInscription: {type: Date, required: true}
});

const inscription = mongoose.model('inscription', inscriptionSchema);

module.exports = inscription;