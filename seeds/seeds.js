const sequelize = require("../config/database");
const User = require("../models/user");
const Event = require("../models/event");

const seedData = async () => {
  try {
    // Sync the database models
    await sequelize.sync({ force: true });

    // Create sample users
    const users = await User.bulkCreate([
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
      // Add more sample users as needed
    ]);

    // Create sample events
    const events = await Event.bulkCreate([
      { eventId: "event1", userId: users[0].id },
      { eventId: "event2", userId: users[1].id },
      // Add more sample events as needed
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

seedData();
