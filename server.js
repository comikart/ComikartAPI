
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
let port = process.env.PORT || 5000;
const server = express();

// mount middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

// sanitation check
server.get('/', (req, res) => {
  res.json({status: 'connected'});
});

// add routes

//port listener
server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})