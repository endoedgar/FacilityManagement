module.exports.logErrors = (err, req, res, next) => {
    console.error(err);
    next(err);
};

module.exports.handleRequestErrors = (err, req, res, next) => {
    if(err.name === "ValidationError")
        res.status(400).send({ message: err.toString() });
    else
        next(err);
};

module.exports.handleErrors = (err, req, res, next) => {
    res.status(500).send({ message: err.toString() });
};