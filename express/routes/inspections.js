const { Router, json } = require('express');
const Inspection = require('../schemas/inspection');

const router = Router();

/* GET inspections listing */
router.get('/', async (req, res, next) => {
    try {
        res.status(200).send({ status: "success", data: await Inspection.find() });
    } catch (err) {
        return next(err);
    }
});

/* GET one inspection */
router.get('/:id', async (req, res, next) => {
    try {
        const inspection = await Inspection.findOne({ "_id": req.params.id });
        inspection ?
            res.status(200).send({ status: "success", data: inspection }) :
            res.status(404).send({ status: "failed", message: "Inspection not found." });
    } catch (err) {
        return next(err);
    }
});


/* GET inspections of a facility */
router.get('/facility/:facility_id', async (req, res, next) => {
    try {
        const inspections = await Inspection.find({ "facility_id": req.params.facility_id });
        inspections ?
            res.status(200).send({ status: "success", data: inspections }) :
            res.status(404).send({ status: "failed", message: "Inspections not found." });
    } catch (err) {
        return next(err)
    }
});


/* POST one inspection */
router.post('/', json(), async (req, res, next) => {
    await new Inspection(req.body).save((err, data) => {
        if (err) return next(err);
        res.status(201).json({ status: "success", message: "Created Successfully!", data });
    });
});


/* PATCH one inspection */
router.patch('/:id', json(), async (req, res, next) => {
    try {
        await Inspection.updateOne({ "_id": req.params.id }, { "$set": req.body });
        res.status(202).json({ status: "success", message: "Updated Successfully!" });
    } catch (err) {
        return next(err);
    }
});


/* DELETE one inspection */
router.delete('/:id', async (req, res, next) => {
    try {
        await Inspection.deleteOne({ "_id": req.params.id });
        res.status(202).json({ status: "success", message: "Deleted Successfully!" });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;