const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);


mongoose.connection.on("connected", function () {
  console.log("connected");
});

mongoose.connection.on("error", function (ex) {
  console.log("error:" + ex);
});

module.exports = {
  SECRET_TOKEN: 'miclavedetokens'
}