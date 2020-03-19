module.exports = (req, res, next) => {
    if((req.body.location[0] !== null) || (req.body.location[1] !== null)) {
        next();
    } else {
        res.sendStatus(400);
    }
};