const mongoose = require('mongoose');
const cfg = require('../config.json');

module.exports.connect = () => {
    return mongoose.connect(cfg.mongoDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
};