const dbConfig = require("../../data/db-config");
const db = require("../../data/db-config");

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

function getAll() {
  return db("companies");
}

function getById(id) {
  return db("companies").where("company_id", id).first();
}

async function create(company) {
  const [id] = await db("companies").insert(company);
  return getById(id);
}

function update(id, changes) {
  return null;
}

function remove(id) {
  return db('companies').where('company_id', id).delete()
}