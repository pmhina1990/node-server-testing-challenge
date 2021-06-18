const router = require("express").Router();
// const { validate } = require("./companies-middleware");
const Company = require("./companies-model");

router.get("/", async (req, res, next) => {
  try {
    const companies = await Company.getAll();
    return res.json(companies);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    return res.json({ message: "GET:id endpoint is up" });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCo = await Company.create(req.body);
    return res.status(201).json(newCo);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    return res.json({ message: "PUT endpoint is up" });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const companyToDelete = await Company.getById(id);
    companyToDelete
      ? await Company.remove(id)
      : res.status(500).json({ message: "deletion failed, please try again" });
    return res.json(companyToDelete);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
});

module.exports = router;