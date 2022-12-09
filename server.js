const { server } = require("./socket");
const PORT = process.env.EXPRESS_PORT || 3000;
const logger = require("./config/tracer");

server.listen(PORT, () => {
  logger.info(`http server on ${PORT}`);
});
