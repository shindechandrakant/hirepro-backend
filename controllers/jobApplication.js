import { jobApplicationUtil, getResumeLink } from "../utils/jobApplication.js";
import { validationResult } from "express-validator";

import { isJobExistAndActiveUtil } from "../utils/jobs.js";
import { JobApplication } from "../entity/JobApplication.js";

export const jobApplication = async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json({
      message: "Missing Job id Fields in path",
    });
  }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Missing Required Fields",
        errors,
      });
    }

    let { first_name, email, phone, coverletter, headline, last_name } =
      req.body;

    const isJobExistAndActive = await isJobExistAndActiveUtil(jobId);
    if (!isJobExistAndActive) {
      return res.status(400).json({
        error: `The job you are trying to apply that doesn't exist or is not active`,
      });
    }

    if (!req.files || !req.files.resume) {
      return res.status(400).json({
        error: "Attach Resume",
      });
    }
    if (req.files.resume.size > process.env.MAX_RESUME_SIZE) {
      return res.status(400).json({
        error: "Resume size too Big... it must be less than 3MB",
      });
    }
    const resume = await getResumeLink(req.files.resume);

    const application = JobApplication.build({
      first_name,
      last_name,
      email,
      phone,
      headline,
      resume,
      coverletter,
      status: "Submitted",
      job_id: jobId,
    });

    await jobApplicationUtil(application);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Unable to apply",
      error: error.message,
    });
  }
};
