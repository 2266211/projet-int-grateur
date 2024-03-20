const express = require('express');
const path = require('path');
const collection = require('./config');
const router = express.Router();

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
        nom : req.body.pseudo,
        motdepasse : req.body.motdepasse
    }

    const existingUser = await collection.findOne({nom : data.nom});
    if(existingUser){
        res.send("User already exists. Please choose wfsdafsda.")
    }
    else{
        const userdata = await collection.create(data);
        console.log(userdata);
        res.render('inscription');
    }
});



module.exports = router;