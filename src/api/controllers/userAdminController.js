const User = require("../../models/userSchema");

function mapUserForAdmin(u) {
  return {
    id: u._id.toString(),
    name: u.name || u.user_name || "",
    email: u.email || "",
    role: u.role === "candidate" ? "Candidate" : "Recruiter",
    status:
      (u.status || "inactive").charAt(0).toUpperCase() +
      (u.status || "inactive").slice(1),
    joinDate: u.createdAt ? u.createdAt.toISOString().slice(0, 10) : "",
    phone: u.phone_number || "",
    position: u.position || "",
    experience:
      Array.isArray(u.experience) && u.experience.length > 0
        ? u.experience[0].duration || ""
        : "",
  };
}

exports.listUsersForAdmin = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).lean();
    const data = users.map(mapUserForAdmin);
    res.send({ status: true, message: "Users list", data });
  } catch (err) {
    next(err);
  }
};

exports.getUserForAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user)
      return res.send({ status: false, message: "Not found", data: {} });
    res.send({
      status: true,
      message: "User fetched",
      data: mapUserForAdmin(user),
    });
  } catch (err) {
    next(err);
  }
};
