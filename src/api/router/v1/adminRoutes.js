const express = require("express");
const router = express.Router();

// Basic admin health endpoint
router.get("/health", (req, res) => {
  res.json({ status: true, message: "admin routes healthy" });
});

module.exports = router;
