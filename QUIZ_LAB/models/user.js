const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  prenom : { type: String, required: true },
  nom : { type: String, required: true },
  password: { type: String, required: true },
  scores: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('user', userSchema);

module.exports = User;