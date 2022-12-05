const logger = require('../config/logger');

// const jwt = require("jsonwebtoken");
// const secretToken = require("../jwt/jwt-utils");

exports.logging = (req, res, next) => {
    let logStr = {}
    
    try {
        logStr = req.originalUrl;

        logStr.method = req.method;

        switch(req.method) {
            case 'GET':
                logStr.query = req.query;
                break;
            case 'POST':
                logStr.query = req.body;
                break;
            case 'PATCH':
                logStr.query = req.body;
                break;
            case 'DELETE':
                logStr.query = req.query;
                break;
        }

        logger.info(JSON.stringify(logStr));

        next();
    } catch (err) {
        logger.error(err);
        res.send({ success: false });
    }
};