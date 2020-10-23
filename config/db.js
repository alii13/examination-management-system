const mongoose = require("mongoose");
require('dotenv').config()

// Replace this with your MONGOURI.
const MONGOURI =
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.jkqob.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.set("useFindAndModify", false);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
