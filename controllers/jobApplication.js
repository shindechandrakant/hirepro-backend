import { jobApplicationUtil } from "../utils/jobApplication.js";

export const jobApplication = async (req, res) => {
  try {
    await jobApplicationUtil(req.body, req.files);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error,
    });
  }
};
