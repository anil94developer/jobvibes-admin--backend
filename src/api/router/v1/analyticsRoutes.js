const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware/authMiddleware");

router.get("/dashboard", authenticate, (req, res) => {
  res.json({ users: 0, jobs: 0, applications: 0 });
});

router.get("/users", authenticate, (req, res) => {
  res.json({ total: 0, active: 0 });
});

router.get("/jobs", authenticate, (req, res) => {
  res.json({ total: 0, published: 0 });
});

router.get("/applications", authenticate, (req, res) => {
  res.json({ total: 0, statuses: {} });
});

router.get("/activities", authenticate, (req, res) => {
  res.json({ items: [] });
});

router.get("/system-health", authenticate, (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
