const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config.json');

module.exports.getJWT = function(user) {
    const {password, ...userObject} = user;
    return { accessToken: jwt.sign(userObject, accessTokenSecret) };
}