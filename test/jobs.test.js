const request = require("supertest");
const expect = require("chai").expect;
const BASE_URL = "http://localhost:8000/api/v1/";
const jobDetails = require("./testData");

/**
 * -- get job by id
 * 1. get job by id shoudl return a job fields if job exist
 * 2. get job by id should return 404 on invalid job id or inActive job
 *
 * -- get job
 * 1. it should return a list of active jobs
 */
describe("Get Job By Id", () => {
  const jobId = "backend-12";
  it("should return a job for specific jobId", (done) => {
    request(BASE_URL)
      .get(`jobs/detail/${jobId}`)
      .end((error, response) => {
        expect(response.statusCode).to.be.equal(200);
        expect(response.body.job).not.to.be.null;
        const job = response.body.job;
        expect(job).not.to.be.null;
        expect(job.points).not.to.be.null;
        expect(job.job_id).to.be.equal(jobDetails.job.job_id);
        expect(job.job_title).to.be.equal(jobDetails.job.job_title);
        expect(job).haveOwnProperty("company");
        if (error) throw error;
        done();
      });
  });

  it("should return 404 on invalid job id", (done) => {
    const jobIdThatdoesntExist = "backend-notexist";
    request(BASE_URL)
      .get(`/jobs/detail/${jobIdThatdoesntExist}`)
      .end((error, response) => {
        expect(response.statusCode).to.be.equal(404);
        if (error) throw error;
        done();
      });
  });

  it("should return a list ob open jobs", (done) => {
    request(BASE_URL)
      .get("jobs/list")
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(Array.isArray(res.body.jobs)).to.be.true;

        res.body.jobs.map((job) => {
          expect(job).haveOwnProperty("job_id");
          expect(job).haveOwnProperty("job_title");
          expect(job).haveOwnProperty("company_name");
          expect(job).haveOwnProperty("experience");
          expect(job).haveOwnProperty("job_type");
          expect(job).haveOwnProperty("key_skills");
          expect(job).haveOwnProperty("company");
        });

        if (err) throw err;
        done();
      });
  });
});
