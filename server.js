require("dotenv").config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOption')
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// handle credentials check before CORS!
// and fetch cookies credentials requirement
app.use(credentials); 

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data in other words, form data:
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files 
// NB: app.use('^/$', ...) means it must start with a slash ^/, and end with a slash /$

app.use('/', require('./routes/root'));
app.use('/tasks', require('./routes/api/tasks'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html'))  {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json'))  {
    res.json({ error: "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
});

app.use(errorHandler); 

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
})