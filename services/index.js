const jwt = require('jwt-simple');
const moment = require("moment");
const mongoose = require("mongoose");
const config = require('../mongo_connection');

function createToken (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };
   return jwt.encode(payload, config.SECRET_TOKEN);
}

secret = 'django-insecure-a_io%mlfbp!llr46laumxu=rqrp9z!q_%yp#x)m!k6v4(6mxcv'

module.exports = createToken, secret;
