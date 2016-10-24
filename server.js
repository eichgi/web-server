const express = require('express');
const app = express();
const port = 3000;

var middleware = {
    requireAuthentication: function (req, res, next) {
        console.log('Private route!');
        next();
    },
    logger: function (req, res, next) {
        console.log('Request: ' + new Date().toString() + ' ' +req.method + ' ' + req.originalUrl);
        next();
    }
};

app.use(middleware.logger);

app.get('/about', middleware.requireAuthentication, function (req, res) {
    res.send('About!');
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
    console.log('Servidor escuchando en el puerto ' + port);
})