const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require("./loadSecrets");

module.exports.getJWT = function(user) {
    const {password, ...userObject} = user;
    return { accessToken: jwt.sign(userObject, accessTokenSecret) };
}