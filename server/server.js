import app from './app';

const port = 3000 || process.env.PORT;

module.exports = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started at localhost:${port}`);
});
