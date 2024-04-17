const express = require('express');
const path = require('path');
const router = express.Router();
const bcrypt = require("bcrypt");

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
    res.render('index');
});

//Cheminement de la page de connexion
router.get('/connexion', (req, res) => {
    res.render('connexion');
});

//Cheminement de la page d'inscription
router.get('/inscription', (req, res) => {
    res.render('inscription', {existingUser : false});
});


//Création d'un compte
router.post("/inscription", async (req, res) => {
    const data = {
        prenom: req.body.prenom,
        nom : req.body.nom,
        motdepasse : req.body.motdepasse
    }

    const existingUser = await User.findOne({prenom : data.prenom}, {nom : data.nom});
    if(existingUser){
        res.send('inscription', {existingUser : true})
    }
    else{
        //Encryption en utilisant l'extension bcrypt et l'algorithme Blowfish cipher
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.motdepasse, saltRounds);

        data.motdepasse = hashedPassword; 

        const userdata = await User.create(data);
        console.log(userdata);
        res.render('inscription', {existingUser : false});
    }
});

//Connexion
router.post("/connexion", async (req, res) => {
    try{
        console.log("Request Body Password : ", req.body.motdepasse);
        const check = await User.findOne({nom: req.body.nom})
        

        if(!check){
                res.send("user name cannot be found");
        }

        //Comparer les mot de passes encrypter avec celui écrit en texte
        if(check != null){
            const isMotDePasseMatch = await bcrypt.compare(req.body.motdepasse, check.motdepasse);
        if(isMotDePasseMatch){
            res.render("index");
        }else{
            req.send("mauvais mot de passe");
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
