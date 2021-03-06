const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');



router.get('/', (req, res) => res.send('Hello world'))

router.post('/signup', async (req, res) => {
    const { email, password} = req.body;
    const newUser = new User({email, password});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id }, 'secretKey')
    res.status(200).json({token})

})

router.post('/signin', async (req, res) => {
    const { email, password} =req.body;
    const user = await User.findOne({email})
    if (!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send("Wrong Password");

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token});

});


module.exports = router;