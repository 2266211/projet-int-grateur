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


module.exports = router;