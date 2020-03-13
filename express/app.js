const server = require('./server');

(async() => {
    try {
        await server();
    } catch(err) {
        console.error(err);
    }
})();