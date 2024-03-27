const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: String, required: true },
  reponse: { type: Integer, required: true }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;