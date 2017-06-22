var express = require('express');

module.exports = function (config) {

    var app = express();

    // view engine setup
    if (config.http.view) {
        app.set('views', config.http.view.path);
        app.set('view engine', config.http.view.engine);
    }

    // uncomment after placing your favicon in /public
    if (config.http.favicon)
        app.use(favicon(config.http.favicon));

    // Set the logger
    app.use(require('morgan')('dev'));

    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(require('cookie-parser')());

    if (config.http.static)
        app.use(express.static(__dirname, config.http.static));

    // Force any default headers required on all responses
    if (config.http.headers)
        app.use(function (req, res, next) {
            Object.keys(config.http.headers)
                    .forEach(function (k) {
                        res.setHeader(k, config.http.headers[k]);
                    });
            next();
        });

    // Add our endpoints
    if (config.endpoint) {
        var router = express.Router();
        Object.keys(config.endpoint)
                .forEach(function (k) {
                    console.log(k);
                    require(config.endpoint[k])(router, config);
                });
                app.use('/', router);
    }

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500)
                    .json({
                        code: err.status || 500,
                        message: err.message,
                        error: err
                    });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
                .json({
                    code: err.status || 500,
                    message: err.message
                });
    });

    return app;
};
