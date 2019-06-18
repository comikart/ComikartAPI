const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
let config = require('./server');

app
  .prepare()
  .then(() => {
    const { server } = config;
    // next js routes
    server.get('/admin/', (req, res, next) => {
      req.url = '/admin/dashboard';
      next('route'); // re-routing to dashboard from the base admin endpoint
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    config.isPrepared = true;
  })
  .catch(ex => {
    console.error(ex.stack);
    process, exit(1);
  });

module.exports = config;
