const mongoose = require("mongoose");

const database_connect = (url) => {
  return mongoose.connect(
    url /*, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
  */
  );
};

module.exports = database_connect;
