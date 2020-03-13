const express = require('express');

const { apiPath, port } = require('./config.json');

const app = express();

const db = require('./util/db');
const { handleErrors, handleRequestErrors, logErrors } = require('./middlewares/errorHandlers');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const facilityRouter = require('./routes/facilities');

async function main() {
    try {
        await db.connect();
        
        app.use(`${apiPath}/users`, userRouter);
        app.use(`${apiPath}/login`, loginRouter);
        app.use(`${apiPath}/facilities`, facilityRouter);

        app.use(logErrors);
        app.use(handleRequestErrors);
        app.use(handleErrors);

        app.listen(port, _ => console.log(`Listening on port ${port}`));
    } catch(err) {
        console.error(err);
    }
}

main();