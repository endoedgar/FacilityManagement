const { Router, json } = require('express');
const jwt = require('jsonwebtoken');

const { accessTokenSecret } = require('../config.json');

const User = require('../schemas/user');
const router = Router();

router.post("/", json(), async(req, res) => {
    const user = await User.findOne(req.body);

    if(user) {
        const {password, ...userObject} = user.toObject();
        const accessToken = jwt.sign(userObject, accessTokenSecret);
        res.send({accessToken});
    } else {
        res.status(401).send({message: "Invalid credentials."})
    }
});

module.exports = router;