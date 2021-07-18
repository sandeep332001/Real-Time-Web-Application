const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Please enter your email!"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Please enter your password!"],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dnl7ydsga/image/upload/v1625988907/avatar/rkienayqdts34s7no1nk.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
