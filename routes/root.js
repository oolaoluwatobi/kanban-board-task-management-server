// const express = require('express');
// const router = express.Router();
// const path = require('path');

// router.get('^/$|/index(.html)?', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/')
  .get(usersController.getAllUsers)


module.exports = router;