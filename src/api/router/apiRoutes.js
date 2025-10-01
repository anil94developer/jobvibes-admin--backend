const express = require("express");
const router = express.Router();

//schemaValidator
const validatorResponse = require("../../utility/joiValidator");

//controller
const {
  getStatesController,
  getCitiesByStateController,
  getJobTitleController,
} = require("../controllers/apiController");

// States
router.get("/states", getStatesController);

// Cities
router.get("/states/:stateId/cities", getCitiesByStateController);

// Job title
router.get("/job-titles", getJobTitleController);

module.exports = router;
