const { Router, json } = require('express');
const Facility = require('../schemas/facility');

const router = Router();

/* GET facilities listing. */
router.get('/', async (req, res, next) => {
    try {
        res.status(200).send({ status: "success", data: await Facility.find() });
    } catch (error) {
        return next(error)
    }
});

/* GET one facility. */
router.get('/:id', async (req, res, next) => {
    const facility = await Facility.findOne({ "_id": req.params.id });
    facility ? res.status(200).send(facility) : res.status(404).send({ message: "Facility not found." });
});

/* POST one facility. */
router.post('/', json(), async (req, res, next) => {
    new Facility(req.body).save((err, data) => {
        if (err) return next(err);
        res.status(201).json({ status: "success", message: "Created Successfully!", data: data });
    });
});

/* PATCH one facility. */
router.patch('/:id', json(), async (req, res, next) => {
    Facility.updateOne({ "_id": req.params.id },
        { "$set": req.body },
        (err, data) => {
            if (err) return next(err);
            res.status(202).json({ status: "success", message: "Updated Successfully!", data: data });
        });
});

/* DELETE one facility. */
router.delete('/:id', async (req, res, next) => {
    Facility.deleteOne({ "_id": req.params.id }, (err) => {
        if (err)
            next(err)
        res.status(202).json({ status: "success", message: "Deleted Successfully!" });
    });
});


module.exports = router;