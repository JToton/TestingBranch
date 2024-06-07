const User = require("../models/user");

const renderSignupForm = (req, res) => {
  res.render("users/signup");
};

const signupUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Create a new user in the database
    const user = await User.create({ username, password });

    // Set the user ID in the session
    req.session.userId = user.id;

    res.redirect("/");
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderLoginForm = (req, res) => {
  res.render("users/login");
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (user && user.password === password) {
      // Set the user ID in the session
      req.session.userId = user.id;

      res.redirect("/");
    } else {
      res.status(401).send("Invalid username or password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  renderSignupForm,
  signupUser,
  renderLoginForm,
  loginUser,
};
