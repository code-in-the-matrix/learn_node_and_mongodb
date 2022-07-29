const { User } = require("./models/user");
const Task = require("./models/task");


const learnPopulateFunction= async () => {
  //const task = await Task.findById("62e380cbed47c516ff05f135")
  //console.log(task)
  //await task.populate('owner')
  //console.log(task.owner)
  const user = await User.findById("62e37ca22f3848b2af6809f7");
  //console.log(user);
  await user.populate('tasks')
  console.log(user.tasks)
};
module.exports = learnPopulateFunction
