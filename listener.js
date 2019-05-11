let port = process.env.PORT || 5000;
const server = require('./server');

//port listener
server.listen(port , () => {
    console.log(`server listening on port ${port}`);
  })