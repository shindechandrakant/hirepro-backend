import { uploadToS3 } from "./AwsS3Config.js";
import { JobApplication } from "../entity/JobApplication.js";

export const jobApplicationUtil = async (fields, files) => {
  try {
    const fileContent = Buffer.from(files.resume.data, "binary");
    const bucketName = process.env.AWS_S3_BUSKET_NAME;

    // Append timestamp to filename
    const fileName = appendToFilename(
      files.resume.name,
      `_${Date.now().toString()}`
    );

    await uploadToS3(bucketName, fileName, fileContent, files.resume.mimetype);
    const resume = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

    const {
      first_name,
      last_name,
      email,
      phone,
      headline,
      coverletter,
      job_id,
    } = fields;

    const application = JobApplication.build({
      first_name,
      last_name,
      email,
      phone,
      headline,
      coverletter,
      resume,
      status: "Submitted",
      job_id,
    });
    await application.save();
  } catch (error) {
    console.log("Error occured while applying job");
    console.log(error);
    throw error;
  }
};

export const appendToFilename = (filename, suffix) => {
  var dotIndex = filename.lastIndexOf(".");
  if (dotIndex == -1) return filename + suffix;
  else
    return (
      filename.substring(0, dotIndex) + suffix + filename.substring(dotIndex)
    );
};
