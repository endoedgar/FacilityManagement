const { Router, json } = require('express');
const { getJWT } = require('../util/jwt');

const User = require('../schemas/user');
const router = Router();

router.post("/", json(), async(req, res) => {
    const user = await User.findOne(req.body);

    if(user) {
        res.send(getJWT(user.toObject()));
    } else {
        res.status(401).send({message: "Invalid credentials."})
    }
});

module.exports = router;