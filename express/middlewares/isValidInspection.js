
module.exports = (req, res, next) => {
    if (req.body.type &&
        req.body.report &&
        req.body.rating) {
        next();
    } else {
        res.status(403).send({ status: "failed", message: "Data is Not Valid. Bad Request, My Dear!" });
    }
}

