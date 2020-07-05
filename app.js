const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
