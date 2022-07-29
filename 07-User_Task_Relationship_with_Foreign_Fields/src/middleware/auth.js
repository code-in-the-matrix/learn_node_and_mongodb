const jwt = require("jsonwebtoken");
const { User } = require("./../models/user");

const auth = async (req, res, next) => {
  console.log("Inside auth middleware");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "jwtSecretPhrase");
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      throw new Error("User not found");
    }
    // adding the user in the request itself, so that we don't have to fetch it again
    req.user = user;
    //console.log(req.user)
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = auth;
