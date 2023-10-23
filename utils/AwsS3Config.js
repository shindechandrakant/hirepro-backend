import pkg from "@aws-sdk/client-s3";
const { S3Client, PutObjectCommand, _Object } = pkg;

const AWS_ACCESSKEY = process.env.AWS_ACCESS_KEY_ID || "";
const AWS_SECRETKEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const AWS_REGION_NAME = process.env.AWS_REGION || "";

const s3Config = {
  credentials: {
    accessKeyId: AWS_ACCESSKEY,
    secretAccessKey: AWS_SECRETKEY,
  },
  region: AWS_REGION_NAME,
};

export const uploadToS3 = async (
  bucketName,
  fileName,
  fileContent,
  fileContentType
) => {
  try {
    console.log("uploading to s3");

    const s3Client = new S3Client(s3Config);
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
      ContentType: fileContentType,
      ACL: "public-read",
    });

    const response = await s3Client.send(command);
    console.log("s3 response", response);
  } catch (error) {
    console.error("Error while uploading", error);
    throw error;
  }
};
