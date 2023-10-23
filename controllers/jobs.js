import { getJobByIdUtil, getAllActiveJobsUtil } from "../utils/jobs.js";

export const getJobById = async (req, res) => {
  const { jobId } = req.params;
  const job = await getJobByIdUtil(jobId);
  if (!job) {
    return res.status(404).json({
      message: `job dosen't exist for id :${jobId}`,
    });
  }
  return res.status(200).json({
    message: "Job Found",
    job,
  });
};

export const getAllActiveJobs = async (req, res) => {
  const jobs = await getAllActiveJobsUtil();
  return res.status(200).json({
    jobs,
    count: jobs.length,
  });
};
