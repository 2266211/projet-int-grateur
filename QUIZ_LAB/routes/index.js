const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require("bcrypt");
let currentUser =  null;

require('./config');

//Schéma mongoose importé
const Question = require('../models/question');
const User = require('../models/user');

//Conversion des données en format json
router.use(express.json());

//Encodation de l'url
router.use(express.urlencoded({extended : false}));

//Cheminement de la page d'accueil
router.get('/', (req, res) => {
    res.render('index', {currentUser : currentUser});
});

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
        const check = await User.findOne({nom: req.body.nom, prenom : req.body.prenom})
        
        if(!check){
                res.render('connexion', {nombreErreur : 1})
        }
        //Comparer les mot de passes encrypter avec celui écrit en texte
        if(check != null){
            const isMotDePasseMatch = await bcrypt.compare(req.body.motdepasse, check.motdepasse);
        if(isMotDePasseMatch){
            currentUser = await User.findOne({adresseCourriel : req.body.adresseCourriel});
            module.exports = currentUser;
            res.render('index', {currentUser : currentUser});
            console.log(currentUser.prenom);
        }else{
            req.render('connexion', {nombreErreur : 0})
        }
        }
    }catch(error){
        console.error("erreur : ", error);
        res.send("Problème avec la connexion");
    }
})

//Quiz

router.get('/quiz', (req, res) => {
    Question.find({})
        .then(questions => {
            res.render('quiz', {questions});
        })
        .catch(err => {
            console.error('La recherche des questions n\'a pas été réussie :', err);
            res.render('erreur', { error: 'Une erreur est survenue au niveau de la recherche de données' });
        });
});

module.exports = router;
