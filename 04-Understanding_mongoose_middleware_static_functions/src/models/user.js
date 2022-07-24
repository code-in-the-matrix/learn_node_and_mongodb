const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
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
});

//MiddleWare that will get executed everytime before the save function is called.
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log(user);

  next();
});

//Static function to find a user using his email and password. Used to login the user.
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("unable to find email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log(password)
    console.log(user.password)
    throw new Error("invalid credentials");
  }

  return user;
};
const User = mongoose.model("User", UserSchema);

const hashingFunction = async () => {
  const password = "Pass123";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
  const isMatch = await bcrypt.compare(password, hashedPassword);

  console.log(isMatch);
};
//hashingFunction()
module.exports = User;
