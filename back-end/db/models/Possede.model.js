const mongoose = require('mongoose');
const compentence = require('./Competences.model');
const projet = require('./Projet.model');

const possedeSchema = new mongoose.Schema({
    idProjet: { type: mongoose.Schema.Types.ObjectId, ref: 'projet', required: true },
    idCompetence: { type: mongoose.Schema.Types.ObjectId, ref: 'competence', required: true }
});

const possede = mongoose.model('possede', possedeSchema);

module.exports = possede;   