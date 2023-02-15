const mongoose = require("mongoose");
const dbUrl = process.env.DATA_BASE;

mongoose
  .connect(dbUrl, { dbName: "emart" })
  .then(() => console.log("Database connect successfully..."))
  .catch((dbError) => console.log("Error Found...", dbError));
