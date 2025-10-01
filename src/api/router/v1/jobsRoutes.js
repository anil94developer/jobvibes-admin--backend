const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middleware/authMiddleware");
const {
  listJobsController,
  getJobByIdController,
  createJobController,
  updateJobController,
  deleteJobController,
  publishJobController,
  unpublishJobController,
} = require("../../controllers/jobController");

// GET /jobs
router.get("/", authenticate, listJobsController);

// GET /jobs/active
router.get("/active", authenticate, (req, res, next) => {
  req.query.status = "open";
  return listJobsController(req, res, next);
});

// GET /jobs/draft
router.get("/draft", authenticate, (req, res, next) => {
  req.query.status = "paused";
  return listJobsController(req, res, next);
});

// GET /jobs/search?q=...
router.get("/search", authenticate, listJobsController);

// POST /jobs
router.post("/", authenticate, createJobController);

// GET /jobs/:id
router.get("/:id", authenticate, getJobByIdController);

// PUT /jobs/:id
router.put("/:id", authenticate, updateJobController);

// DELETE /jobs/:id
router.delete("/:id", authenticate, deleteJobController);

// POST /jobs/:id/publish
router.post("/:id/publish", authenticate, publishJobController);

// POST /jobs/:id/unpublish
router.post("/:id/unpublish", authenticate, unpublishJobController);

// POST /jobs/:id/video (TODO: implement upload handling)
router.post("/:id/video", authenticate, (req, res) => {
  res.send({ status: true, message: "Video uploaded", data: {} });
});

module.exports = router;
