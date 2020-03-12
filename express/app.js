const express = require('express');

const cfg = require('./config.json');

const app = express();

const db = require('./util/db');
const { handleErrors, handleRequestErrors, logErrors } = require('./middlewares/errorHandlers');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');

async function main() {
    try {
        await db.connect();
        
        app.use('/users', userRouter);
        app.use('/login', loginRouter);

        app.use(logErrors);
        app.use(handleRequestErrors);
        app.use(handleErrors);

        app.listen(cfg, _ => console.log(`Listening on port ${cfg.port}`));
    } catch(err) {
        console.error(err);
    }
}

main();