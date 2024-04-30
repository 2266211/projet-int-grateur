const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const JWT_SECRET = 'hopla';

require('./config');

//Schéma mongoose importé
const Question = require('../models/question');
const User = require('../models/user');
const Quiz = require('../models/quiz');

//Variable temporaire
let scoreTemp = [false,false,false,false,false,false,false,false,false,false];
let finalScore = 0;

//Variable temporelle
let tempsDebut = 0;
let tempsPris = 0;

//Conversion des données en format json
router.use(express.json());

//Encodation de l'url
router.use(express.urlencoded({extended : false}));

//Cheminement de la page d'accueil
router.get('/', (req, res) => {
    res.render('index');
});

router.use(cookieParser());

//Cheminement de la page de connexion
router.get('/connexion', (req, res) => {
    res.render('connexion', {nombreErreur : 50});
});

//Cheminement de la page d'inscription
router.get('/inscription', (req, res) => {
    res.render('inscription', {existingUser : false, nombreErreur : 50});
});


//Création d'un compte
router.post("/inscription", async (req, res) => {
    const data = {
        prenom: req.body.prenom,
        nom : req.body.nom,
        adresseCourriel : "whatever",
        motdepasse : req.body.motdepasse
    }

    const existingUser = await User.findOne({prenom : data.prenom}, {nom : data.nom}, {adresseCourriel : data.adresseCourriel});
    if(existingUser){
        res.render('inscription', {existingUser : true, nombreErreur : 1})
    }else if(data.motdepasse.length < 6){
        res.render('inscription', {existingUser : true, nombreErreur : 0})
    }
    else{
        //Encryption en utilisant l'extension bcrypt et l'algorithme Blowfish cipher
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.motdepasse, saltRounds);

        data.motdepasse = hashedPassword; 

        const userdata = await User.create(data);
        console.log(userdata);
        res.render('inscription', {existingUser : false, nombreErreur : 50});
    }
});

//Connexion
router.post("/connexion", async (req, res) => {
    try{
        const user = await User.findOne({nom: req.body.nom, prenom : req.body.prenom})
        
        if(!user){
                res.render('connexion', {nombreErreur : 1})
        }
        //Comparer les mot de passes encrypter avec celui écrit en texte
        if(user != null){
            const isMotDePasseMatch = await bcrypt.compare(req.body.motdepasse, user.motdepasse);
        if(isMotDePasseMatch){
            const token = jwt.sign({userID : user._id}, JWT_SECRET);
            res.cookie('token', token);
            res.redirect('/')
            console.log(token);
        }else{
            req.render('connexion', {nombreErreur : 0});
        }
        }
    }catch(error){
        console.error("erreur : ", error);
        res.send("Problème avec la connexion");
    }
})

//Vérification du Token
function verifierToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).redirect('/connexion');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).redirect('/connexion');
        req.userId = decoded.userId;
        next();
    });
}

//Quiz
router.get('/quiz', async (req, res) => {
    
    try{
        const quiz = await Quiz.findOne({Titre : "o"});
        const currentQuestionIndex = parseInt(req.query.currentQuestionIndex) || 0;
        if(currentQuestionIndex == 0){
        tempsDebut = Math.floor(Date.now()/1000);
        console.log(tempsDebut);
        }
        if(quiz != null){
            console.log(currentQuestionIndex);
            res.render('quiz2', {quiz, currentQuestionIndex});
        }else{
            console.log('Le quiz est nul');
        }
    } catch (error){
        console.error('Error: ', error);
        res.status(500).send('Internal Server Error');
    }
    
});


//Soumission des réponses + actualisation à la prochaine question + calcul de score temporaire
router.post('/submit-answer', async(req, res) => {
    const currentQuestionIndex = req.body.currentQuestionIndex || 0;
    const nextQuestionIndex = parseInt(currentQuestionIndex) + 1;

    const quiz = await Quiz.findOne({ Titre: "o" });
    const indexBonneReponse = quiz.questions[currentQuestionIndex].response;
    const indexReponseUtilisateur = parseInt(req.body.answer);

    if(indexBonneReponse == indexReponseUtilisateur){
        try{
            scoreTemp[currentQuestionIndex] = true;

            console.log('Bonne reponse. Score updated.')
            console.log(scoreTemp[currentQuestionIndex]);
        }catch(error){
            console.log(error);
        }
    }else{
        console.log('Mauvaise reponse');
        console.log(scoreTemp[currentQuestionIndex]);
    }
    res.redirect(`/quiz?currentQuestionIndex=${nextQuestionIndex}`);
  });

  //Soumission finale du questionnaire + traitement du score
  router.post('/submit-quiz', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userID;
        const user = await User.findById(userId);

        const quiz = await Quiz.findOne({ Titre: "o" });
        quiz.foisFait++;

        let scoreFinal = 0;

        for(let i = 0 ; i < 10 ; i++){
            if(scoreTemp[i]){
                scoreFinal++;
            }
            if(scoreTemp[i]){
                quiz.questions[i].foisReussi++;
            }
        }

        if(scoreFinal > 5){
            quiz.foisReussi++;
        }

        console.log(tempsDebut);

        tempsPris = (Math.floor(Date.now()/1000)) - (tempsDebut);
        console.log(tempsPris);
        quiz.temps.push(tempsPris);

        await quiz.save();

        finalScore = scoreFinal;

        if (scoreFinal > (user.scores && user.scores.length > 0 ? user.scores[0] : 0)) {
            user.scores[0] = scoreFinal;
            await user.save();
            console.log('Score Utilisateur mise à jour.');
        } else {
            console.log('Score temporaire est plus bas.');
        }
    } catch (error) {
        console.error(error);
    }

    //Remise à zéro du array de scores temporaires
    for(let i = 0 ; i < scoreTemp.length; i++){
        scoreTemp[i] = false;
    }
    res.redirect('/quiz-result');
});

router.get('/quiz-result', async (req, res) => {
    try {
        console.log(finalScore);
        res.render('quiz-result', { scoreFinal: finalScore});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
