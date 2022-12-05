const { server } = require("./socket");
const PORT = process.env.EXPRESS_PORT || 3000;
const logger = require("./config/logger");

server.listen(PORT, () => {
  logger.info(`http server on ${PORT}`);
});
