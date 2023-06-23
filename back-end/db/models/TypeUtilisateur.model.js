const mongoose = require('mongoose');

// Modèle pour la table Utilisateurs
const typeUtilisateurSchema = new mongoose.Schema({
    nom: { type: String,enum: ['enseignant', 'étudiant', 'administrateur'], required: true }
});

const typeUtilisateur = mongoose.model('typeUtilisateur', typeUtilisateurSchema);

module.exports = typeUtilisateur;