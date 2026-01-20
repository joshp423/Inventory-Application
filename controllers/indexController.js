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
const lengthErrTitle = "must be between 1 and 25 characters.";
const numErrPrice = "must be above $1.";
const numErrQuantity = "must be between 1 and 2000 units.";
const isAlphaBrand = "must be a brand.";

const validateMessage = [
  body("productTitle").trim().escape()
    .isLength({min: 1, max: 200}).withMessage(`Product title ${lengthErrTitle}`),
  body("productPrice").escape()
    .isCurrency({allow_negatives: 'false'})
    .isNumeric().isInt({min: 1})
  
]

module.exports = {
  allStockGet,
  createStockPost: [
    validateMessage,
    async function 
  ]
}
