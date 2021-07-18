const mongoose = require("mongoose");
const connection = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/auth";
mongoose.connect(
  connection,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("connected to mongodb");
  }
);
