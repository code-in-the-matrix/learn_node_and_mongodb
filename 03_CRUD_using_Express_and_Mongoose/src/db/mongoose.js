const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = require("./../models/task");

const dbName = "myProject";
async function main() {
  //const dbName = "myProject";
  await mongoose.connect("mongodb://127.0.0.1/" + dbName);

  //Code to create a new task and save it.

  //const t1 = new Task({ description: "Learn NodeJS",
  //completed: false,
  //});

  //t1.save()
  //.then(console.log(t1))
  //.catch((error) => {
  //console.log(error);
  //});
  //const u1 = new User({
  //name: "Asfi",
  //email: "asfi@gmail.com",
  //});
  //u1.save()
  //.then(console.log(u1))
  //.catch((error) => {
  //console.log(error);
  //});
}
main()
  .then(console.log("Connected to", dbName, "successfully"))
  .catch((error) => {
    console.log("Error in connecting to db");
  });
