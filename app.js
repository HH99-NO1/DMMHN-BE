const express = require("express");
const app = express();
// const PORT = process.env.EXPRESS_PORT || 3000;
const cors = require("cors");
const connect = require("./models/index");
const expiration = require("./schedule/schedule");
connect();

const morgan = require("morgan");
const routes = require("./routes/index.routes");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// scheduler 실행
expiration;

app.use("/", routes);

// app.listen(PORT, () => {
//   console.log(`${PORT} is Running`);
// });

module.exports = app
