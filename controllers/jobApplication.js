import { jobApplicationUtil } from "../utils/jobApplication.js";

export const jobApplication = async (req, res) => {
  try {
    let { first_name, email, phone } = req.body;
    if (!first_name || !email || !phone || !req.files.resume) {
      return res.status(400).json({
        error: "Missing Required Fields",
      });
    }
    if (req.files.resume.size > process.env.MAX_RESUME_SIZE) {
      return res.status(400).json({
        error: "Resume size too Big... it must be less than 3MB",
      });
    }

    await jobApplicationUtil(req.body, req.files);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to apply",
      error: error.message,
    });
  }
};
