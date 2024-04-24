const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  prenom : { type: String, required: true },
  nom : { type: String, required: true },
  adresseCourriel : {type : String, required : true},
  motdepasse: { type: String, required: true },
  scores: {type: [Number]},
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

module.exports = User;