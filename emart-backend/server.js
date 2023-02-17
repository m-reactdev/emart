require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
let port = process.env.PORT || 4000;

require("./src/config/db");

app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(morgan("short"));

app.use((req, res, next) => {
  // console.log("A request came: ", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Mern Stack Project Of Emart.");
});

app.use("/api/users", require("./src/routes/UserRoutes"));

app.use("/api/products", require("./src/routes/ProductRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
