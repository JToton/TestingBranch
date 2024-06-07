const router = require("express").Router();
const axios = require("axios");
const withAuth = require("../utils/auth");

// GET all events in Salt Lake City from Ticketmaster Discovery API
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/events.json",
      {
        params: {
          apikey: "AVDgVcvKelwg39PSEXIBgvRlF45Qv88g",
          city: "Salt Lake City",
          stateCode: "UT",
          radius: "10",
          unit: "miles",
          sort: "date,asc",
        },
      }
    );

    const events = response.data._embedded.events.map((event) => ({
      id: event.id,
      name: event.name,
      url: event.url,
      startDate: event.dates.start.localDate,
      startTime: event.dates.start.localTime,
      venue: event._embedded.venues[0].name,
    }));

    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one event
router.get("/event/:id", withAuth, async (req, res) => {
  try {
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events/${req.params.id}.json`,
      {
        params: {
          apikey: "AVDgVcvKelwg39PSEXIBgvRlF45Qv88g",
        },
      }
    );

    const event = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.info,
      url: response.data.url,
      startDate: response.data.dates.start.localDate,
      startTime: response.data.dates.start.localTime,
      venue: response.data._embedded.venues[0].name,
    };

    res.render("event", { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;