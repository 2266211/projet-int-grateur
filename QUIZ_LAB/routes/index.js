const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const JWT_SECRET = 'hopla';
const ss =require('simple-statistics');
require('./config');

//Schéma mongoose importé
const User = require('../models/user');
const Quiz = require('../models/quiz');

//Variable temporaire
let questionRepondu = [false,false,false,false,false,false,false,false,false,false];
let scoreTemp = [false,false,false,false,false,false,false,false,false,false];
let finalScore = 0;

//Variable temporelle
let tempsDebut = 0;
let tempsPris = 0;

//Varible du questionnaire le plus récent
let testCourant = "";

//Conversion des données en format json
router.use(express.json());

router.use(express.static('public'));

//Encodation de l'url
router.use(express.urlencoded({extended : false}));
router.use(cookieParser());

//Cheminement de la page d'accueil
router.get('/', async (req, res) => {
    try{
        if(req.cookies && Object.keys(req.cookies).length > 0){
            const token = req.cookies.token;
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.userID;
            const user = await User.findById(userId);
            if(!user){
                
            }else{
                res.render('accueil', {utilisateurCo : true});
            }
        }else{
            res.render('accueil', {utilisateurCo : false});
        }

    }catch(error){
        console.log(error)
    }

});

router.get('/utilisateur', async (req,res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userID;
    const user = await User.findById(userId);

    if(user.admin){
        res.redirect('/admin');
    }else{
        res.redirect('/classique')
    }
})

//Cheminement utilisateur admin
router.get('/admin', async (req,res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userID;
    const user = await User.findById(userId);

    res.render('admin', {user : user, quiz : null});
})

router.post("/acces-stats", async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userID;
    const user = await User.findById(userId);

    console.log(req.body.nomQuiz);

    const nomQuiz = req.body.nomQuiz;
    console.log(nomQuiz);
    const quizCourant = await Quiz.findOne({titre : nomQuiz});

    console.log(quizCourant.scores);

    const moyenne = ss.mean(quizCourant.scores);
    const mediane = ss.median(quizCourant.scores);
    const ecartType = ss.standardDeviation(quizCourant.scores);
    const tempsMoyen = ss.mean(quizCourant.temps);


    const pourR = (quizCourant.foisReussi/quizCourant.foisFait)*100;


    res.render('admin', {user : user, quiz : quizCourant, moyenne : moyenne, mediane : mediane, ecartType : ecartType, tempsMoyen : tempsMoyen, pourR : pourR});
});



//Cheminement utilisateur classique
router.get('/classique', async (req,res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userID;
    const user = await User.findById(userId);

    console.log(user);

    res.render('classique', {user : user});
})

//Cheminement rapide pour la déconnexion + clear des cookies
router.get('/deconnexion', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

//Cheminement de la page de connexion
router.get('/connexion', (req, res) => {
    res.render('connexion', {nombreErreur : 50});
});

//Cheminement de la page d'inscription
router.get('/inscription', (req, res) => {
    res.render('inscription', {existingUser : false, nombreErreur : 50});
});

//Création d'un compte classique
router.post("/inscription", async (req, res) => {
    const data = {
        prenom: req.body.prenom,
        nom : req.body.nom,
        adresseCourriel : req.body.adresseCourriel,
        motdepasse : req.body.motdepasse,
        scores : [0,0,0,0,0,0,0,0,0,0],
        admin : false
    }

    const existingUser = await User.findOne({adresseCourriel : data.adresseCourriel});
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
        res.render('/', {existingUser : false, nombreErreur : 50});
    }
});

//Connexion à un compte déjà existant, qu'il soit un compte admin ou classique
router.post("/connexion", async (req, res) => {
    try{
        const user = await User.findOne({adresseCourriel : req.body.adresseCourriel})
        
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
            res.render('connexion', {nombreErreur : 0});
        }
        }
    }catch(error){
        console.error("erreur : ", error);
        res.send("Problème avec la connexion");
    }
})

//Accès au quiz différent dépendamment du button sélectionner dans la page web
router.post('/acces-quiz', (req,res)=>  {
    try{
        testCourant = req.body.nomQuiz;
        res.redirect('/quiz');
    }catch(error){
        console.error('Error: ' , error);
        res.status(500).send('Internal Server Error');
    }
})

//Quiz + début du chrono pour le temps
router.get('/quiz', async (req, res) => {
    try{
        const quiz = await Quiz.findOne({titre : testCourant});
        const currentQuestionIndex = parseInt(req.query.currentQuestionIndex) || 0;
        if(currentQuestionIndex == 0){
            tempsDebut = Math.floor(Date.now()/1000);
        }
        if(quiz != null){
            console.log(currentQuestionIndex);
            res.render('quiz', {quiz, currentQuestionIndex, questionRepondu});
        }else{
            console.log('Le quiz est nul');
        }
    } catch (error){
        console.error('Error: ', error);
        res.status(500).send('Internal Server Error');
    }
    
});

router.post('/next', async(req, res) => {
    const currentQuestionIndex = req.body.currentQuestionIndex || 0;
    const nextQuestionIndex = parseInt(currentQuestionIndex) + 1;

    res.redirect(`/quiz?currentQuestionIndex=${nextQuestionIndex}`);
  });


//Soumission des réponses + actualisation à la prochaine question + calcul de score temporaire
router.post('/submit-answer', async(req, res) => {
    const currentQuestionIndex = req.body.currentQuestionIndex || 0;

    const quiz = await Quiz.findOne({ titre: testCourant });
    const indexBonneReponse = quiz.questions[currentQuestionIndex].response;
    const indexReponseUtilisateur = parseInt(req.body.answer);

    if(indexBonneReponse == indexReponseUtilisateur){
        try{
            questionRepondu[currentQuestionIndex] = true;
            scoreTemp[currentQuestionIndex] = true;

            console.log('Bonne reponse. Score updated.')
            console.log(scoreTemp[currentQuestionIndex]);
        }catch(error){
            console.log(error);
        }
    }else{
        questionRepondu[currentQuestionIndex] = true;
        scoreTemp[currentQuestionIndex] = false;
        console.log('Mauvaise reponse');
        console.log(scoreTemp[currentQuestionIndex]);
    }
    res.redirect(`/quiz?currentQuestionIndex=${currentQuestionIndex}`);
  });

  //Soumission finale du questionnaire + traitement du score + traitement du temps pris
  router.post('/submit-quiz', async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userID;
        const user = await User.findById(userId);

        const quiz = await Quiz.findOne({ titre: testCourant });

        quiz.foisFait++;

        let scoreFinal = 0;


        for(let i = 0 ; i < 10 ; i++){
            if(scoreTemp[i]){
                scoreFinal++;
                quiz.questions[i].foisReussi++;
            }
        }

        if(scoreFinal > 6){
            quiz.foisReussi++;
        }

        console.log(tempsDebut);

        tempsPris = (Math.floor(Date.now()/1000)) - (tempsDebut);
        console.log(tempsPris);

        if(quiz.temps[0] == 0){
            quiz.temps[0] = tempsPris;
        }else{
            quiz.temps.push(tempsPris);
        }

        if(quiz.scores[0] && quiz.length == 0){
            quiz.scores[0] = scoreFinal;
        }else{
            quiz.scores.push(scoreFinal);
        }

        await quiz.save();

        finalScore = scoreFinal;

        if (scoreFinal > (user.scores && user.scores.length > 0 ? user.scores[0] : 0)) {
            user.scores[0] = scoreFinal;
            await user.save();
            console.log('Score Utilisateur mise à jour.');
        } else {
            console.log('Score temporaire est plus bas ou égale à son meilleur score.');
        }
    } catch (error) {
        console.error(error);
    }

    //Remise à zéro du array de scores temporaires
    for(let i = 0 ; i < scoreTemp.length; i++){
        questionRepondu[i] = false;
        scoreTemp[i] = false;
    }
    res.redirect('/quiz-result');
});

//Affichage de la page de résultat après avoir soumis un questionnaire
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