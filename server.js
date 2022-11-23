const { server } = require("./app");
const PORT = process.env.EXPRESS_PORT || 3000;

server.listen(PORT, () => {
  console.log("http server on", PORT);
});
