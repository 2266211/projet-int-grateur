const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  questions: [{
    question: String,
    options: [String],
    response: Number,
    foisReussi: Number
  }],
  nbQuestion : { type: Number, required: true },
  temps: { type: [Number] , required : true },
  scores: { type: [Number] , required : true },
  foisReussi: { type: Number , required : true },
  foisFait: {type: Number, required : true},
  indice : {type : Number , required : true},
}, {collection: 'quiz'});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;