const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/", eventController.getEvents);
router.post("/save/:eventId", eventController.saveEvent);

module.exports = router;
