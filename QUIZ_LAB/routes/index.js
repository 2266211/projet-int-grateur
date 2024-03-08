const express = require('express');
const router = express.Router();

app.use(express.static('public'));

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;