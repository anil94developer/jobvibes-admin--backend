const {
  listJobsService,
  getJobByIdService,
  createJobService,
  updateJobService,
  deleteJobService,
  publishJobService,
  unpublishJobService,
} = require("../services/jobServices");

exports.listJobsController = async (req, res, next) => {
  try {
    const data = await listJobsService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.getJobByIdController = async (req, res, next) => {
  try {
    const data = await getJobByIdService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.createJobController = async (req, res, next) => {
  try {
    const data = await createJobService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.updateJobController = async (req, res, next) => {
  try {
    const data = await updateJobService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteJobController = async (req, res, next) => {
  try {
    const data = await deleteJobService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.publishJobController = async (req, res, next) => {
  try {
    const data = await publishJobService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};

exports.unpublishJobController = async (req, res, next) => {
  try {
    const data = await unpublishJobService(req);
    res.send(data);
  } catch (err) {
    next(err);
  }
};
