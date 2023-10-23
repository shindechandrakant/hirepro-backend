import { myDataSource } from "./databaseConnection.js";
import { Job } from "../entity/job.js";

export const getJobByIdUtil = async (jobId) => {
  const job = await Job.findAll({
    where: {
      job_id: jobId,
    },
  });

  return job;
};

export const getAllActiveJobsUtil = async () => {
  const jobs = await Job.findAll({
    where: {
      is_active: true,
    },
  });
  return jobs;
};
