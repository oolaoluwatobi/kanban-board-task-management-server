const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.route('/')
  .get(tasksController.getAllTasks)


module.exports = router;