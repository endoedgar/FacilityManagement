const { Router, json } = require('express');
const jwt = require('jsonwebtoken');

const { accessTokenSecret } = require('../config.json');

const User = require('../schemas/user');
const router = Router();

router.post("/", json(), (req, res) => {
    const {username, password} = req.body;

    console.log("trying")
    const user = User.findOne({username, password})

    if(user) {
        const {password, ...userObject} = user;
        const accessToken = jwt.sign(userObject, accessTokenSecret);
        res.send({accessToken});
    } else {
        res.status(401).send({message: "Invalid credentials."})
    }
});

module.exports = router;