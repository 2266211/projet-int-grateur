const express = require('express');
const router = express.Router();
const User = require('C:/Users/2266211/Downloads/projet-int-grateur-main/projet-int-grateur-main/QUIZ_LAB/models/user');


// Login Page
router.get('/connexion', (req, res) => {
    res.render('connexion');
});

// Register Page
router.get('/inscription', (req, res) => {
    res.render('inscription');
});

module.exports = router;