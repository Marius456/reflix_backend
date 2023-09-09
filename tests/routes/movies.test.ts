import { app } from "../../src/app";
import request from "supertest";

// jest.mock("../../src/app")

describe("GET /movies", () => {
  it("Get all movies API Request", async () => {
    const result = await request(app).get("/movies")
      .expect(200)
      .expect('Content-Type', /json/)
  });
});

describe("GET /movies/genre/:genre", () => {
  it("Get movies with specific genre API Request", async () => {
    const result = await request(app).get("/movies/genre/Action")
      .expect(200)
      .expect('Content-Type', /json/)
  });
});

describe("GET /movies/:id", () => {
  it("Get movie with specific id API Request", async () => {
    const result = await request(app).get("/movies/5");
    expect(result.statusCode).toEqual(400);
  });
});
