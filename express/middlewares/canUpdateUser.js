module.exports = (req, res, next) => {
    if((req.user.username === req.params.username) || req.user.groups.includes("Administrator")) {
        next();
    } else {
        res.sendStatus(403);
    }
};