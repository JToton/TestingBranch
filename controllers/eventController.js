const axios = require("axios");
const Event = require("../models/event");

const getEvents = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.eventbriteapi.com/v3/events/search/",
      {
        headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_API_KEY}`,
        },
        params: {
          "location.address": "New York", // Replace with the desired city
        },
      }
    );

    const events = response.data.events;
    res.render("events/index", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
};

const saveEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.session.userId;

    // Save the event to the database associated with the user
    await Event.create({
      eventId,
      userId,
    });

    res.redirect("/events");
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getEvents,
  saveEvent,
};
