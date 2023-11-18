const request = require("supertest");
const expect = require("chai").expect;
const BASE_URL = "http://localhost:8000/api/v1/";
const RESUME_PATH =
  "C:\\Users\\chand\\OneDrive\\Desktop\\Full_Stack_Case_Study__Beekin_.pdf";

/**
 * --Apply job
 * 1. Apply job should return 204 on successfull
 * 2. Apply job missing required fields should return 400
 * 3. apply job that dosen't exist
 *
 *
 */
describe("Get Job By Id", () => {
  const jobId = "backend-12";
  it("should return 204 on job application", (done) => {
    request(BASE_URL)
      .post(`jobs/apply/${jobId}`)
      .field("first_name", "Chandrakant")
      .field("last_name", "Shinde")
      .field("email", "chandrakant@gmail.com")
      .field("phone", "1234567890")
      .field("headline", "Full Stack Developer")
      .attach("resume", Buffer.from(RESUME_PATH))
      .end((error, response) => {
        expect(response.statusCode).to.be.equal(204);
        if (error) throw error;
        done();
      });
  });

  it("should return a 400 on trying to apply with missing fields", (done) => {
    request(BASE_URL)
      .post(`jobs/apply/${jobId}`)
      .field("first_name", "Chandrakant")
      .field("email", "chandrakant@gmail.com")
      .field("phone", "1234567890")
      .field("headline", "Full Stack Developer")
      .attach("resume", Buffer.from(RESUME_PATH))
      .end((error, response) => {
        expect(response.statusCode).to.be.equal(400);
        expect(response.body.message).to.be.equal("Missing Required Fields");
        if (error) throw error;
        done();
      });
  });

  it("should return a 400 on trying to apply with missing fields", (done) => {
    const jobIdThatDosentExist = "jobDoesNotExist";
    request(BASE_URL)
      .post(`jobs/apply/${jobIdThatDosentExist}`)
      .field("first_name", "Chandrakant")
      .field("last_name", "Shinde")
      .field("email", "chandrakant@gmail.com")
      .field("phone", "1234567890")
      .field("headline", "Full Stack Developer")
      .attach("resume", Buffer.from(RESUME_PATH))
      .end((error, response) => {
        expect(response.statusCode).to.be.equal(400);
        expect(response.body.error).to.be.equal(
          "The job you are trying to apply that doesn't exist or is not active"
        );
        if (error) throw error;
        done();
      });
  });
});
