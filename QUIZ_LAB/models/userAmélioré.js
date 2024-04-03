const mongoose = require('mongoose');

const userASchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  scores: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserA = mongoose.model('UserA', userASchema);

module.exports = UserA;