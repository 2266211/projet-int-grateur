const mongoose = require('mongoose');

//Schéma d'un utilisateur
const userSchema = new mongoose.Schema({
  prenom : { type: String, required: true },
  nom : { type: String, required: true },
  adresseCourriel : {type : String, required : true},
  motdepasse: { type: String, required: true },
  scores: {type: [Number]},
  admin : {type : Boolean, required : true},
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

module.exports = User;