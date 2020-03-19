const express = require("express");
const cors = require("cors");
const path = require('path');

const { apiPath, port } = require("./config.json");
const db = require("./util/db");
const {
  handleErrors,
  handleRequestErrors,
  logErrors
} = require("./middlewares/errorHandlers");

const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const facilityRouter = require("./routes/facilities");
const inspectionRouter = require("./routes/inspections");

const app = express();

async function main() {
  await db.connect();

  app.use(cors());
  app.use(`${apiPath}/users`, userRouter);
  app.use(`${apiPath}/login`, loginRouter);
  app.use(`${apiPath}/facilities`, facilityRouter);
  app.use(`${apiPath}/inspections`, inspectionRouter);
  app.use(express.static("dist"));
  app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  });

  app.use(logErrors);
  app.use(handleRequestErrors);
  app.use(handleErrors);

  return app.listen(port, _ => console.log(`Listening on port ${port}`));
}

module.exports = main;
