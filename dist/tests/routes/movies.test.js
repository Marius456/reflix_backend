"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../src/app");
const supertest_1 = __importDefault(require("supertest"));
// jest.mock("../../src/app")
describe("GET /movies", () => {
    it("Get all movies API Request", async () => {
        const result = await (0, supertest_1.default)(app_1.app).get("/movies")
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
describe("GET /movies/genre/:genre", () => {
    it("Get movies with specific genre API Request", async () => {
        const result = await (0, supertest_1.default)(app_1.app).get("/movies/genre/Action")
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
describe("GET /movies/:id", () => {
    it("Get movie with specific id API Request", async () => {
        const result = await (0, supertest_1.default)(app_1.app).get("/movies/5");
        expect(result.statusCode).toEqual(400);
    });
});
//# sourceMappingURL=movies.test.js.map