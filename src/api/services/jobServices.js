const Feed = require("../../models/feedSchema");
const { getPaginatedResults } = require("../../utility/paginate");

exports.listJobsService = async (req) => {
  try {
    const { page = 1, limit = 10, q = "", status, source } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { skills: { $in: [q] } },
      ];
    }
    if (status) filter.status = status;
    if (source) filter.source = source;

    return await getPaginatedResults(Feed, filter, {
      page,
      limit,
      sort: { createdAt: -1 },
    });
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: {
        results: [],
        pagination: { total: 0, totalPages: 0, page: 1, limit: 10 },
      },
    };
  }
};

exports.getJobByIdService = async (req) => {
  try {
    const job = await Feed.findById(req.params.id).lean();
    if (!job) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job fetched", data: job };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.acceptFeedService = async (req) => {
  try {
    const updated = await Feed.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    ).lean();
    if (!updated) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job approved", data: updated };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.rejectFeedService = async (req) => {
  try {
    const updated = await Feed.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).lean();
    if (!updated) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job rejected", data: updated };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.createJobService = async (req) => {
  try {
    const created = await Feed.create(req.body);
    return { status: true, message: "Job created", data: created };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.updateJobService = async (req) => {
  try {
    const updated = await Feed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).lean();
    if (!updated) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job updated", data: updated };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.deleteJobService = async (req) => {
  try {
    const deleted = await Feed.findByIdAndDelete(req.params.id).lean();
    if (!deleted) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job deleted", data: {} };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.publishJobService = async (req) => {
  try {
    const updated = await Feed.findByIdAndUpdate(
      req.params.id,
      { status: "open" },
      { new: true }
    ).lean();
    if (!updated) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job published", data: updated };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};

exports.unpublishJobService = async (req) => {
  try {
    const updated = await Feed.findByIdAndUpdate(
      req.params.id,
      { status: "paused" },
      { new: true }
    ).lean();
    if (!updated) return { status: false, message: "Job not found", data: {} };
    return { status: true, message: "Job unpublished", data: updated };
  } catch (error) {
    return { status: false, message: error.message, data: {} };
  }
};
