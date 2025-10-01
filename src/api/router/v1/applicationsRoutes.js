const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware/authMiddleware");

router.get("/", authenticate, (req, res) => {
  res.json({ items: [], total: 0 });
});

router.get("/:id", authenticate, (req, res) => {
  res.json({ id: req.params.id });
});

router.post("/", authenticate, (req, res) => {
  res.status(201).json({ id: "application_stub" });
});

router.patch("/:id/status", authenticate, (req, res) => {
  res.json({ id: req.params.id, status: req.body?.status || "updated" });
});

router.get("/job/:jobId", authenticate, (req, res) => {
  res.json({ jobId: req.params.jobId, items: [] });
});

router.get("/user/:userId", authenticate, (req, res) => {
  res.json({ userId: req.params.userId, items: [] });
});

router.post("/:id/interview", authenticate, (req, res) => {
  res.json({ id: req.params.id, interview: "scheduled" });
});

router.get("/matches", authenticate, (req, res) => {
  res.json({ items: [] });
});

router.get("/:id/match-score", authenticate, (req, res) => {
  res.json({ id: req.params.id, score: 0 });
});

module.exports = router;
