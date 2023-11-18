import { uploadToS3 } from "./AwsS3Config.js";
import { JobApplication } from "../entity/JobApplication.js";

export const jobApplicationUtil = async (jobApplication) => {
  try {
    await jobApplication.save();
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

export const getResumeLink = async (resume) => {
  const fileContent = Buffer.from(resume.data, "binary");
  const bucketName = process.env.AWS_S3_BUSKET_NAME;

  // Append timestamp to filename
  const fileName = appendToFilename(resume.name, `_${Date.now().toString()}`);
  await uploadToS3(bucketName, fileName, fileContent, resume.mimetype);
  const resumeLink = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  return resumeLink;
};
