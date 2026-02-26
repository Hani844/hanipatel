const next = require('next');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`NeuroForge AI running at http://localhost:${port}`);
  });
});
