const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const Task = require("./task")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error();
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

//MiddleWare that will get executed everytime before the save function is called.
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  //console.log(user);

  next();
});

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("unable to find email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log(password);
    console.log(user.password);
    throw new Error("invalid credentials");
  }
  return user;
};

// Instance method defined for a particular user
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "jwtSecretPhrase");
  //console.log(token)
  //user.tokens = user.tokens.concat({token});
  // We could also have saved the token here itself.
  //await user.save();
  return token;
};
const generateAuthTokenFunction = (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, "jwtSecretPhrase");
  //console.log(token)
  return token;
};
UserSchema.methods.getPublicProfile = function () {
  console.log("Inside get Public profile method");
  const user = this.toObject();
  //console.log(user)
  delete user.tokens;
  delete user.password;
  //console.log(user)
  return user;
};
const User = mongoose.model("User", UserSchema);

module.exports = { User, generateAuthTokenFunction };
