const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: { type: String, required: true, trim: true },
  completed: { type: Boolean, default: false },
  owner: {
    //Will store the Object Id of the 'model' that we want to save here.
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    //The Object Id can be used to find the instance of that model. In this case, user.
    //But we can take help of Mongoose to do that task for us,
    //by creating a 'ref', which can be later populated.
    ref: "User",
    //The ref option is what tells Mongoose which model to use during population,
    //in our case 'User'.
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
