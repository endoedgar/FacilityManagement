const mongoose = require("mongoose");
const cfg = require("./loadSecrets");

module.exports.connect = () => {
  return mongoose.connect(cfg.mongoDB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};
