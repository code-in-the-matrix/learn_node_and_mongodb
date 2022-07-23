const express = require("express");
const router = express.Router();

const Task = require("./../models/task");

//GET all the tasks
router.get("/tasks", (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});
//GET task by ID
router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  Task.findById(_id)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});
//Create a new Task
router.post("/tasks/create", (req, res) => {
  //console.log(req.body)
  const t = new Task(req.body);
  console.log(t);
  t.save()
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(500).send();
    });
});

//UPDATE a task using ID
router.patch("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findByIdAndUpdate(_id, req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(404).send();
    });
});

//DELETE a task using ID
router.delete("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findByIdAndDelete(_id)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(404).send();
    });
});

module.exports = router;
