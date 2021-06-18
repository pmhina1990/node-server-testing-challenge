const Company = require("./companies-model");

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

describe("Company model", () => {
  it("works", () => {
    expect(true).toBe(true);
  })

  describe("getAll", () => {
    let companies;
    beforeEach(async () => {
      companies = await Company.getAll();
    });
    it("can retrieve all companies", async () => {
      expect(companies).toHaveLength(4);
    });
    it("retrieves companies with {id, name}", async () => {
      expect(companies[0]).toMatchObject({ company_id: 1, name: "Stripe" });
      expect(companies[1]).toMatchObject({ company_id: 2, name: "Google" });
    });
  });

  describe("getById", () => {
    it("can get company object {id, name} by its id", async () => {
      const stripe = await Company.getById(1);
      expect(stripe).toMatchObject({ company_id: 1, name: "Stripe" });
    });
  });

  describe("insert", () => {
    it("can insert a company into the db", async () => {
      const ondeck = { name: "On Deck", technology: 1 };
      await Company.create(ondeck);
      expect(await db("companies")).toHaveLength(5);
      const insertedOndeck = await db("companies").where({ company_id: 5 }).first();
      expect(insertedOndeck).toMatchObject(ondeck);
    });
    it("resolves to the newly inserted company", async () => {
      const ford = { name: "Ford" };
      const result = await Company.create(ford);
      expect(result).toMatchObject({ company_id: 5, name: "Ford" });
    });
  });

  describe("delete", () => {
    it("can delete a company from the db", async () => {
      await Company.remove(4);
      expect(await db("companies")).toHaveLength(3);
    });
  });
})