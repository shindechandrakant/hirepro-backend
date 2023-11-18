import { Job } from "../entity/Jobs.js";
import { JobField } from "../entity/JobField.js";
import { Company } from "../entity/Company.js";
import { Sequelize } from "sequelize";

export const getJobByIdUtil = async (jobId) => {
  const job = await Job.findOne({
    attributes: [
      "job_id",
      ["title", "job_title"],
      "experience",
      "location",
      "key_skills",
      "created_at",
      "applicant_count",
      "job_type",
    ],
    include: [{ model: Company, attributes: ["name"] }],
    where: {
      job_id: jobId,
      is_active: true,
    },
  });

  if (!job) return job;

  const fields = await getJobFields(jobId);
  const points = fields.reduce((accumulator, { dataValues }) => {
    if (accumulator[dataValues.field_name]) {
      accumulator[dataValues.field_name].push(dataValues.field_description);
    } else {
      accumulator[dataValues.field_name] = [dataValues.field_description];
    }
    return accumulator;
  }, {});
  return { ...job.dataValues, points };
};

export const getAllActiveJobsUtil = async () => {
  const jobs = await Job.findAll({
    attributes: [
      "job_id",
      ["title", "job_title"],
      [Sequelize.col("company.name"), "company_name"],
      "experience",
      "location",
      "key_skills",
      "created_at",
      "applicant_count",
      "job_type",
    ],
    include: [{ model: Company, attributes: ["name"] }],
    where: {
      is_active: true,
    },
  });

  let newJobs = [];

  for (let [index, job] of jobs.entries()) {
    newJobs.push(job.dataValues);
  }
  return newJobs;
};

const getJobFields = async (jobId) => {
  const fields = await JobField.findAll({
    where: { job_id: jobId },
  });

  return fields;
};

export const isJobExistAndActiveUtil = async (jobId) => {
  const count = await Job.count({
    where: {
      job_id: jobId,
      is_active: true,
    },
  });

  return count === 0 ? false : true;
};
