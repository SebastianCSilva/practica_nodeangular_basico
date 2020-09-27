const { Router } = require('express');
const router = Router();

const User = require('../models/User');

router.get('/', (req, res) => res.send('Hello world'))

router.post('/signup', (req, res) => {
    res.send('register');

})


module.exports = router;