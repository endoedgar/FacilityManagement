const { Router, json } = require('express');
const Facility = require('../schemas/facility');
const isValidFacility = require('../middlewares/isValidFacility');
const authenticateJWT = require('../middlewares/authenticateJWT');


const router = Router();

/* GET facilities listing */
router.get('/', authenticateJWT,async (req, res, next) => {
    try {
        res.status(200).send({ status: "success", data: await Facility.find() });
    } catch (err) {
        return next(err);
    }
});

/* GET one facility */
router.get('/:id', authenticateJWT, async (req, res, next) => {
    try {
        const data = await Facility.findOne({ "_id": req.params.id });
        data ?
            res.status(200).send({ status: "success", facility: data }) :
            res.status(404).send({ status: "failed", message: "Facility not found." });
    } catch (err) {
        return next(err);
    }

});

/* POST one facility */
router.post('/', authenticateJWT, json(), isValidFacility, async (req, res, next) => {
    try {
        const data = await new Facility(req.body).save();
        res.status(201).json({ status: "success", message: "Created Successfully!", data });
    } catch (error) {
        return next(err);
    }

});

/* PATCH one facility */
router.patch('/:id', authenticateJWT, json(), async (req, res, next) => {
    try {
        const data = await Facility.findOneAndUpdate({ "_id": req.params.id }, { "$set": req.body }, { new: true });
        res.status(202).json({ status: "success", message: "Updated Successfully!", data });
    } catch (error) {
        return next(err);
    }
});

/* DELETE one facility */
router.delete('/:id', authenticateJWT, async (req, res, next) => {
    try {
        await Facility.deleteOne({ "_id": req.params.id });
        res.status(202).json({ status: "success", message: "Deleted Successfully!" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;