const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//Simple playground to understand the working of mongoose populate
const learnPopulateFunction = require("./learnPopulate")
learnPopulateFunction()

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
