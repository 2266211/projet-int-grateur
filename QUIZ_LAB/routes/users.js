const express = require('express');
const router = express.Router();


// Login Page
router.get('/connexion', (req, res) => {
    res.render('connexion');
});

// Register Page
router.get('/inscription', (req, res) => {
    res.render('inscription');
});

module.exports = router;