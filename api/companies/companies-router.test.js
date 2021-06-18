const server = require("../server");
const request = require("supertest");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("companies").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

it('process.env.NODE_ENV must be "testing"', () => {
  expect(process.env.NODE_ENV).toEqual("testing");
});

describe("Company router", () => {
  it("works", () => {
    expect(true).toBe(true);
  });

  describe("[GET] /companies", () => {
    it("returns all the companies", async () => {
      const res = await request(server).get("/api/companies/");
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
      expect(res.type).toEqual("application/json");
    });
  });

  describe("[POST] /companies", () => {
    it("responds with the new company", async () => {
      const res = await request(server)
        .post("/api/companies/")
        .send({ name: "Ford" });

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ company_id: 5, name: "Ford" });
    });
  });

  describe("[DELETE] /companies/:id", () => {
    it("responds with the deleted company", async () => {
      const res = await request(server).delete("/api/companies/4");

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ company_id: 4, name: "FedEx" });
    });
  });
});