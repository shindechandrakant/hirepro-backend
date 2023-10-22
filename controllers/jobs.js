import { getJobByIdUtil } from "../utils/jobs.js";

export const getJobById = async (req, res) => {
  const { jobId } = req.params;
  const job = await getJobByIdUtil(jobId);
  return res.status(200).json({
    message: "Job Found",
    job,
  });
};
