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

router.post('/connexion', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        console.log('hop');

        if (!user || user.password !== password) {
            console.log('hopla');
            return res.redirect('/users/connexion');
        }

        console.log('hoppla');

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;