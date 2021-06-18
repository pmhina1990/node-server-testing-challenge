exports.seed = function (knex) {
    return knex("companies")
      .truncate()
      .then(function () {
        return knex("companies").insert([
          { name: "Comcast", technology: 1 },
          { name: "Tesla", technology: 1 },
          { name: "Google" },
          { name: "Warner Bros", technology: 0 },
        ]);
      });
  };