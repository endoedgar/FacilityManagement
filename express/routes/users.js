const { Router, json } = require('express');

const authenticateJWT = require('../middlewares/authenticateJWT');

const User = require('../schemas/user');

const router = Router();

router.get('/', authenticateJWT, async (req, res) => {
    res.send(await User.find())
});

router.get('/:username', authenticateJWT, async (req, res,next) => {
    const user = await User.findOne({username: req.params.username});
    user ? res.send(user) : res.status(404).send({ message: "User not found." });
});

router.post('/', authenticateJWT, json(), async (req, res,next) => {
    new User(req.body).save((err) => {
        if(err) return next(err);
        res.status(201).send({message: "User created successfully."});
    });
});

module.exports = router;