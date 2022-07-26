const jwt = require('jwt-simple');
const moment = require("moment");
const mongoose = require("mongoose");
const config = require('mongo_conenection');

function createToken (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };
   return jwt.encode(payload, config.SECRET_TOKEN);
}

module.exports = createToken;
