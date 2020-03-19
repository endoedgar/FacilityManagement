const fs = require("fs");

// Try to get secret parameters from config.json
// If not possible, tries to read it from Environment Variables
function getSecretsCfg() {
  try {
    data = fs.readFileSync(__dirname + "/../secrets.json", "utf-8");
    return JSON.parse(data);
  } catch (err) {
    const { mongoDB, accessTokenSecret } = process.env;
    return { mongoDB, accessTokenSecret };
  }
}

module.exports = getSecretsCfg();
