const express = require('express');

const app = express();

const { apiPath, port } = require('./config.json');

const db = require('./util/db');
const { handleErrors, handleRequestErrors, logErrors } = require('./middlewares/errorHandlers');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const facilityRouter = require('./routes/facilities');

async function main() {
    await db.connect();
        
    app.use(`${apiPath}/users`, userRouter);
    app.use(`${apiPath}/login`, loginRouter);
    app.use(`${apiPath}/facilities`, facilityRouter);

    app.use(logErrors);
    app.use(handleRequestErrors);
    app.use(handleErrors);

    return app.listen(port, _ => console.log(`Listening on port ${port}`));
}

module.exports = main;