require('dotenv').load();

const express = require('express');
const app = express();
const apiRouter = require('./routes/api/v1/index')

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

const sendResponse = (req, res, next) => {
    res.sendResponse = (body, message, code) => {
      let response = {};
      response['statusCode'] = code || 200;
      response['status'] = 'success';
      response['message'] = message || 'success';
      response['body'] = body;
      res.json(response);
    };
    next();
};

const sendError = (req, res, next) => {
    res.sendError = (err, message, code) => {
        let response = {};
        response['status'] = 'fail';
        response['statusCode'] = 500;
        response['message'] = message || err.message;
        response['body'] = err;
        res.json(response);
      };
    next();
};


app.use(allowCrossDomain);
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.use(sendResponse);
app.use(sendError);
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});

