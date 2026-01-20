require('dotenv').config();
const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
];

async function allStockGet (req, res) {
  const stock = await db.getAllStock();
  res.render("index", {title: "Musical Instrument Inventory Application", stock, links})
}

async function createStockGet (req, res) {
  res.render("createStockForm", {title: "New Stock Entry", links});
};

const { body, validationResult, matchedData } = require("express-validator");

const validateMessage = [
  body("")
]

module.exports = {
  allStockGet,
}
