const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const indexRoutes = require("./routes/index");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Create an instance of express-handlebars
const hbs = engine({ extname: ".hbs" });

// Set up Handlebars as the templating engine
app.engine("hbs", hbs);
app.set("view engine", "hbs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/events", eventRoutes);
app.use("/users", userRoutes);

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is running on http://localhost:3001");
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
