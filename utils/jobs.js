import { Job } from "../entity/job.js";
import { JobField } from "../entity/JobField.js";
import { Company } from "../entity/Company.js";
import { sequelize } from "./databaseConnection.js";
import { Sequelize } from "sequelize";

export const getJobByIdUtil = async (jobId) => {
  const job = await Job.findOne({
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
    include: [{ model: Company, attributes: [] }],
    where: {
      job_id: jobId,
    },
  });

  const fields = await getJobFields(jobId);
  let points = [];

  for (let [index, field] of fields.entries()) {
    let { field_name, field_description } = field;
    points.push({
      field_name,
      points: field_description.split("="),
    });
  }
  return { points, ...job.dataValues };
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
    include: [{ model: Company, attributes: [] }],
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
    attributes: [
      "field_name",
      [
        sequelize.fn(
          "GROUP_CONCAT",
          sequelize.literal(`field_description, '='`)
        ),
        "field_description",
      ],
    ],
    where: { job_id: jobId },
    group: ["field_name"],
  });

  return fields;
};
