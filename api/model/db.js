const mongoose = require("mongoose");

// Replace this with your MONGOURI.
// const MONGOURI = process.env.MONGODBURI || "mongodb://localhost:27017/ftc2020";
// console.log("Connected to DB !! env", process.env.MONGODBURI);
const InitiateMongoServer = async () => {
  // process.env.MONGODBURI ||
  const MONGOURI = process.env.MONGODBURI || "mongodb://localhost:27017/ftc2020";
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!", MONGOURI);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;