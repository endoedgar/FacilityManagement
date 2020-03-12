const { Router } = require('express');
const { json } = require('express');

const User = require('../schemas/user');

const router = Router();

router.get('/', async (req, res) => {
    res.send(await User.find())
});

router.get('/:username', async (req, res,next) => {
    const user = await User.findOne({username: req.params.username});
    user ? res.send(user) : res.status(404).send({ message: "User not found." });
});

router.post('/', json(), async (req, res,next) => {
    new User(req.body).save((err) => {
        if(err) return next(err);
        res.status(201).send({message: "User created successfully."});
    });
});

module.exports = router;