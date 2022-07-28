const express = require("express");
const router = express.Router();

const { User, generateAuthTokenFunction } = require("./../models/user");
const auth = require("./../middleware/auth");

//Create a new user
router.post("/users/create", async (req, res) => {
  try {
    const user = new User(req.body);
    //console.log(user)
    const token = generateAuthTokenFunction(user);
    console.log(token);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    //return current token to allow user to login with that
    res.send({ user: user.getPublicProfile(), token });
  } catch (error) {
    res.status(400).send(error);
  }
});
// Login existing user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = generateAuthTokenFunction(user);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    //return current token to allow user to login with that
    res.status(200).send({ user: user.getPublicProfile(), token });
  } catch (error) {
    res.status(404).send("Invalid credentials");
  }
});

//GET details of logged in user
// Authentication middleware required
router.get("/users/me", auth, async (req, res) => {
  try {
    console.log("Inside get profile of logged in users");
    const user = req.user.getPublicProfile();
    console.log(user);
    //console.log(user.getPublicProfile());
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send();
  }
});
// Logout user from current logged in session
router.post("/users/logout", auth, async (req, res) => {
  try {
    console.log("Inside logout function");
    const requestToken = req.header("Authorization").replace("Bearer ", "");
    // Have already saved the user in the request itself
    const user = req.user;
    //console.log(user)
    req.user.tokens = req.user.tokens.filter((token) => {
      // token is the object which has a token property
      return token.token !== requestToken;
    });
    await req.user.save();
    res.status(200).send("Logged out of current session.");
  } catch (error) {
    res.status(400).send();
  }
});
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    console.log("Inside logout function");
    const requestToken = req.header("Authorization").replace("Bearer ", "");
    // Have already saved the user in the request itself
    const user = req.user;
    //console.log(user)
    req.user.tokens = req.user.tokens.filter((token) => {
      // token is the object which has a token property
      return false;
    });
    await req.user.save();
    res.status(200).send("Logged out of all session.");
  } catch (error) {
    res.status(400).send();
  }
});
//We don't want any user to update details of any other other.
router.patch("/users/", auth, async (req, res) => {
  const _id = req.user._id;
  const user = await User.findById(_id);
  if (!user) {
    res.status(404).send();
  }
  const updates = Object.keys(req.body);
  updates.forEach((update) => {
    user[update] = req.body[update];
  });
  await user.save();
  res.status(201).send();
});

//We don't want any user to delete any other user
router.delete("/users/", auth, (req, res) => {
  const _id = req.user._id;
  console.log(_id);
  User.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).send("Deleted user.");
    })
    .catch((error) => {
      res.status(404).send();
    });
});

//GET all the users
//router.get("/users", auth, async (req, res) => {
//// Using promises
////User.find()
////.then((users) => {
////res.status(200).send(users);
////})
////.catch((error) => {
////res.status(404).send(error);
////});
//try {
//const users = await User.find();
//res.status(200).send(users);
//} catch (error) {
//res.status(400).send();
//}
//});

//Create a new user
//router.post("/users/create", async (req, res) => {
//try {
//const user = new User(req.body);
//const token = await user.generateAuthToken();
////console.log(token)
//user.tokens = user.tokens.concat({ token });

////console.log(user)
//await user.save();
//res.send(user);
//} catch (error) {
//res.status(400).send(error);
//}
//});

module.exports = router;
