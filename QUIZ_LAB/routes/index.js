const express = require('express');
const path = require('path');
const collection = require('./config');
const router = express.Router();
const bcrypt = require("bcrypt");

//Conversion des données en format json
router.use(express.json());

router.use(express.urlencoded({extended : false}));

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/connexion', (req, res) => {
    res.render('connexion');
});
router.get('/inscription', (req, res) => {
    res.render('inscription');
});


//Création d'un compte
router.post("/inscription", async (req, res) => {
    const data = {
        nom : req.body.nom,
        motdepasse : req.body.motdepasse
    }

    const existingUser = await collection.findOne({nom : data.nom});
    if(existingUser){
        res.send("User already exists. Please choose wfsdafsda.")
    }
    else{
        //Encryption en utilisant bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.motdepasse, saltRounds);

        data.motdepasse = hashedPassword; 


        const userdata = await collection.create(data);
        console.log(userdata);
        res.render('inscription');
    }
});

//Connexion
router.post("/connexion", async (req, res) => {
    try{
        console.log("Request Body Password : ", req.body.motdepasse);
        const check = await collection.findOne({nom: req.body.nom})
        

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

const Question = require('../models/question'); 

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

/*router.get('/quiz', (req, res) => {
    Question.find({})
        .then(questions => {
            if (!questions || questions.length === 0) {
                // Handle case when no questions are found
                res.render('error', { error: 'No questions found' });
            } else {
                // Render the quiz view with the fetched questions
                res.render('quiz', { questions });
            }
        })
        .catch(err => {
            console.error('Error fetching questions:', err);
            res.render('error', { error: 'An error occurred while fetching questions' });
        });
});*/

module.exports = router;