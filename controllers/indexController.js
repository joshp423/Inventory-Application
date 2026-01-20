require('dotenv').config();
const db = require("../db/queries");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New Message" },
];

export async function allStockGet (req, res) {
  const stock = await db.getAllStock();
  res.render("index", {title: "Musical Instrument Inventory Application", stock, links})
}

export async function createStockGet (req, res) {
  const categories = await db.getAllCategories();
  res.render("createStockForm", {title: "New Stock Entry", links, categories});
};

const { body, validationResult, matchedData } = require("express-validator");
const lengthErrTitle = "must be between 1 and 200 characters.";
const lengthErrDesc = "must be between 1 and 500 characters.";
const numErrPrice = "must be above $1.";
const typeErrPrice = "must be currency";
const numErrQuantity = "must be between 1 and 2000 units.";
const isAlphaBrand = "must contain letters.";
const lengthErrBrand = "must be between 1 and 25 characters.";

const validateProduct = [
  body("productTitle").trim().escape()
    .isLength({min: 1, max: 200}).withMessage(`Product title ${lengthErrTitle}`),
  body("productDesc").trim().escape()
    .isLength({min: 1, max: 500}).withMessage(`Product description: ${lengthErrDesc}`)
    .isAlphanumeric().withMessage(`Product description: ${isAlphaBrand}`),
  body("productPrice").escape()
    .isCurrency({allow_negatives: 'false'}).withMessage(typeErrPrice)
    .isNumeric().isInt({min: 1}).withMessage(numErrPrice),
  body("productQuantity").trim().escape()
    .isNumeric().isInt({min: 1, max: 2000}).withMessage(numErrQuantity),
  body("productBrand").trim().escape().isAlpha().withMessage(`Product brand ${isAlphaBrand}`)
    .isLength({min:1, max: 25}).withMessage(`Product brand ${lengthErrBrand}`)
]

export const createStockPost = [
  ...validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).render("createStockForm", {
        title: "Create new message",
        links,
        errors: errors.array(),
      })
    }
    const {productTitle, productPrice, productQuantity, productBrand, productCategory} = matchedData(req);

    await db.addNewStock(productTitle, productPrice, productQuantity, productBrand, productCategory);
    res.redirect('/');
  }
]

export async function editStockGet (req, res) {
  const stock = await db.getSelectedStock("id", req.params.stockid)
  res.render("editStockForm", {title: "Edit Stock", links, stock});
};

export const editStockPost = [
  ...validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).render("createStockForm", {
        title: "Create new message",
        links,
        stock,
        errors: errors.array(),
      })
    }
    const {productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory} = matchedData(req);

    await db.editSelectedStock(productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory);
    res.redirect('/');
  }
]




