import formidable, { errors as formidableErrors } from "formidable";
import { jobApplicationUtil } from "../utils/jobApplication.js";

export const jobApplication = async (req, res) => {
  //
  try {
    const form = formidable({});
    let [fields, files] = await form.parse(req);
    await jobApplicationUtil(fields, files);
    return res.status(200).json({
      fields,
      files,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
    });
  }
};
