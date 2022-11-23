const { server } = require("./socket");
const PORT = process.env.EXPRESS_PORT || 3000;

server.listen(PORT, () => {
  console.log("http server on", PORT);
});
