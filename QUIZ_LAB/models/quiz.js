const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  Titre: { type: String, required: true },
  questions : { type: [Question], required: true },
  nbQuestion : { type: Number, required: true },
  temps: { type: [Number] , required : true },
  foisReussi: { type: Number , required : true },
  foisFait: {type: Number, required : true}
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;