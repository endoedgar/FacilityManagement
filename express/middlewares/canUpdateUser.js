module.exports = (req, res, next) => {
    if((req.user.username === req.params.username) || req.user.admin) {
        next();
    } else {
        res.sendStatus(403);
    }
};