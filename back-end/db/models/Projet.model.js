const mongoose = require('mongoose');
const utilisateur = require('./Utilisateurs.model');

// Modèle pour la table Projets
const projetSchema = new mongoose.Schema({
  idEnseignant: { type: mongoose.Schema.Types.ObjectId, ref: 'utilisateur', required: true },
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateCreation: {type: Date, required: true}
});

const projet = mongoose.model('projet', projetSchema);

module.exports = projet;