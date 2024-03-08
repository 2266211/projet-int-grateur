const express = require('express');
const router = express.Router();

app.use(express.static('public'));

// Login Page
router.get('/login', (req, res) => res.end('Login'));

// Register Page
router.get('/register', (req, res) => res.end('Login'));

module.exports = router;