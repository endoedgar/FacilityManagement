/**
 * Module dependencies
 */

const mongoose = require('mongoose');

/**
 * Define Schema 
 */

const facilitySchema = mongoose.Schema({
  name: String,
  type: String,
  location: [Number]
});

/**
 * Define Indexes
 */

facilitySchema.index({ name: 1 }, { sparse: true });
facilitySchema.index({ type: 1 }, { sparse: true });
facilitySchema.index({ location: 1 }, { sparse: true });
facilitySchema.index({ name: 1, type: 1 }, { sparse: true });
facilitySchema.index({ type: 1, name: 1 }, { sparse: true });
facilitySchema.index({ name: 1, location: 1 });


/**
 * Define model
 */


module.exports = mongoose.model('Facility', facilitySchema);