const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", async (req, res, next) => {
  const data = req.context;
  const itemCtr = controllers.item.instance();
  data.coffee = await itemCtr.get({ category: "coffee" });
  data.tea = await itemCtr.get({ category: "tea" });
  data.pastries = await itemCtr.get({ category: "pastries" });

  res.render("home", data);
});

router.get("/menu", (req, res, next) => {
  res.render("menu", req.context);
});

router.get("/blog", (req, res, next) => {
  res.render("blog", req.context);
});

router.get("/items", async (req, res, next) => {
  const filters = req.query;
  const itemCtr = controllers.item.instance();
  const items = await itemCtr.get(filters);
  res.json({
    items,
  });
});

module.exports = router;
