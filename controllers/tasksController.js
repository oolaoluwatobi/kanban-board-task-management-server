const Task = require('../model/Task');

const createNewTask = async (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) return res.status(400).json({ 'message': 'Title and Description are required.'});

  try {
    const result = await Task.create({ 
      title,
      description,
      status
    });

    console.log(result, "ln:14 taskController: result");

    res.status(201).json({ result: { title, description, status } });
  } catch (err) {
    res.status(500).json({ 'message': err.message })
  } 
}

const getAllTasks = async (req, res) => {
  
  //current page
  const page = req.query.p - 1 || 0;
  const tasksPerPage = 5;

  // let tasks = [];
  const tasks = await Task.find()
  .sort({ title: 1 })
  .skip(page * tasksPerPage)
  .limit(tasksPerPage);
  console.log(tasks, "21: tasksCont...")
  
  if (!tasks) return res.status(204).json({ 'message': 'No tasks found.'});
  
  console.log(tasks, "27: tasksCont...")

  res.json(tasks); 
}

const updateTask = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'ID parameter is required.'});
  }

  const task = await Task.findOne({ _id: req.body.id }).exec();  
  if (!task) {
    return res.status(400).json({ "message": `No task matches ID ${req.body.id}.`});
  }
  if (req.body?.title) task.title = req.body.title;
  if (req.body?.description) task.description = req.body.description;
  if (req.body?.status) task.status = req.body.status;
  const result = await task.save();
  res.json(result);
}

const deleteTask = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ 'message': 'Task ID is required.'});
  }

  const task = await Task.findOne({ _id: req.body.id }).exec();  
  if (!task) {
    return res.status(204).json({ "message": `No Task matches ID ${req.body.id}.`});
  }
  const result = await task.deleteOne({ _id: req.body.id });
  res.json(result);
}

const getTask = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ 'message': 'Task ID is required.'});
  }

  const task = await Task.findOne({ _id: req.params.id }).exec();  
  if (!task) {
    return res.status(400).json({ "message": `No task matches ID ${req.params.id}.`});
  }
  res.status(200).json(task);
}

module.exports = {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
  getTask
}


