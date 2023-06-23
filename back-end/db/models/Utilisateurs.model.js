const mongoose = require('mongoose');
const typeUtilisateur = require('./TypeUtilisateur.model');

// Modèle pour la table Utilisateurs
const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salt: {type: String, required: true, unique: true},
    hash: { type: String, required: true },
    id_typeUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'typeUtilisateur', required: true }
});

const utilisateur = mongoose.model('utilisateur', utilisateurSchema);

module.exports = utilisateur;