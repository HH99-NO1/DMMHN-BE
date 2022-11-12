const express = require("express");
const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;
const cors = require("cors");
const connect = require("./models/index.models");
connect();

const morgan = require("morgan");
const routes = require("./routes/index.routes");

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`${PORT} is Running`);
});
