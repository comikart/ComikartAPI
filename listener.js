const port = process.env.PORT || 5000;
const config = require('./nextConfig');

const isPrepared = () => {
  if (config.isPrepared) {
    const { server } = config;
    server.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } else {
    setTimeout(isPrepared, 1000);
  }
};

// port listener
isPrepared();
