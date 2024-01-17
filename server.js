const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

const { getData } = require("./src/assets/data/data");

server.use(middlewares);

server.use((req, res, next) => {
  setTimeout(next, 2000);
});

server.use((req, res, next) => {
  switch (req.path) {
    case "/get-comments":
      setTimeout(() => {
        res.status(200).json(getData);
      }, 2000);
      return;
    default:
      next();
  }
});

server.listen(process.env.PORT, () => {
  console.log("JSON server is running on port", process.env.PORT);
});
