const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {type: String, index: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean
});

module.exports = mongoose.model('User', userSchema);