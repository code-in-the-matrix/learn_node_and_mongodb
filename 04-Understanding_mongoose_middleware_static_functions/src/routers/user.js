const express = require("express");
const router = express.Router();

const User = require("./../models/user");

//GET all the users
router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});
//GET users by ID
router.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  User.findById(_id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});
//Uses static function defined on UserSchema.
router.post("/users/login", async (req, res)=>{
  const user = await User.findByCredentials(req.body.email, req.body.password)

  if(!user){
    res.status(404).send("Invalid credentials")
  }
  res.status(200).send(user)
}) 
//Create a new user
router.post("/users/create", (req, res) => {
  //console.log(req.body)
  const user = new User(req.body);
  console.log(user);
  user
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(500).send();
    });
});

//UPDATE a user using ID
router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await User.findById(_id)
  if(!user){
    res.status(404).send()
  }
  const updates = Object.keys(req.body)
  updates.forEach((update)=>{
    user[update] = req.body[update]
  })
  await user.save()
  res.status(201).send()
});



//DELETE a user using ID
router.delete("/users/:id", (req, res) => {
  const _id = req.params.id;
  User.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(404).send();
    });
});

module.exports = router;
