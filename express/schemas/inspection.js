/**
 * Module dependencies
 */

const mongoose = require('mongoose');

/**
 * Define Schema 
 */

const inspectionSchema = mongoose.Schema({
    facility_id: mongoose.Schema.Types.ObjectId,
    inspector_id: mongoose.Schema.Types.ObjectId,
    type: String,
    report: String,
    rating: Number
});

/**
 * Define Indexes
 */

inspectionSchema.index({ inspector: 1 }, { sparse: true });
inspectionSchema.index({ type: 1 }, { sparse: true });
inspectionSchema.index({ rating: 1 }, { sparse: true });
inspectionSchema.index({ inspector: 1, type: 1 }, { sparse: true });
inspectionSchema.index({ type: 1, rating: 1 }, { sparse: true });
inspectionSchema.index({ inspector: 1, type: 1, rating: 1 });


/**
 * Define model
 */


module.exports = mongoose.model('Inspection', inspectionSchema);