require('dotenv').config();
const db = require("../db/queries");

const links = [
  { href: "/", text: "Stock View" },
  { href: "/viewCategories", text: "Category View" },
];

async function allStockGet (req, res) {
  const stock = await db.getAllStock();
  res.render("index", {title: "Musical Instrument Inventory Application", stock, links})
}

async function createStockGet (req, res) {
  const categories = await db.getAllCategories();
  res.render("stockPages/createStockForm", {title: "New Stock Entry", links, categories});
};

const { body, validationResult, matchedData } = require("express-validator");
const lengthErrTitle = "must be between 1 and 200 characters.";
const lengthErrDesc = "must be between 1 and 500 characters.";
const numErrPrice = "must be above $1.";
const numErrQuantity = "must be between 1 and 2000 units.";
const isAlphaBrand = "must contain letters.";
const lengthErrBrand = "must be between 1 and 25 characters.";

const validateProduct = [
  body("productTitle").trim().escape()
    .isLength({min: 1, max: 200}).withMessage(`Product title ${lengthErrTitle}`),
  body("productDesc").trim().escape()
    .isLength({min: 1, max: 500}).withMessage(`Product description: ${lengthErrDesc}`),
  body("productPrice").escape()
    .isNumeric().isInt({min: 1}).withMessage(numErrPrice),
  body("productQuantity").trim().escape()
    .isNumeric().isInt({min: 1, max: 2000}).withMessage(numErrQuantity),
  body('productCategory').trim().escape(),
  body("productBrand").trim().escape().isAlpha().withMessage(`Product brand ${isAlphaBrand}`)
    .isLength({min:1, max: 25}).withMessage(`Product brand ${lengthErrBrand}`)
]

const validateCategory = [
  body("categoryTitle").trim().escape()
    .isLength({min: 1, max: 50}).withMessage("Category must be between 1 and 50 characters.")
]

const createStockPost = [
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
    const {productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory} = matchedData(req);

    
    await db.addNewStock(productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory);
    res.redirect('/');
  }
]

async function editStockGet (req, res) {
  const productid = req.params.stockid;
  const stock = await db.getSelectedStockId(productid);
  const categories = await db.getAllCategories();
  res.render("stockPages/stockEditForm", {title: "Edit Stock", links, stock:stock[0], categories});
};

const editStockPost = [
  ...validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const stock = await db.getSelectedStockId(req.params.stockid);
      const categories = await db.getAllCategories();
      return res.status(400).render("stockPages/stockEditForm", {
        title: "Create new message",
        links,
        stock:stock[0],
        categories,
        errors: errors.array(),
      })
    }
    const {productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory} = matchedData(req);

    await db.editSelectedStock(req.params.stockid, productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory);
    res.redirect('/');
  }
]

async function deleteStockGet (req, res) {
  const productid = req.params.stockid;
  const stock = await db.getSelectedStockId(productid);
  res.render("stockPages/stockDeletePage", {title: "Delete Stock Confirmation", links, stock:stock[0]});
};

async function deleteStockPost (req, res) {
  const productid = req.params.stockid;
  await db.deleteSelectedStock(productid);
  res.redirect('/');
}

async function viewCategoriesGet (req, res) {
  const categories = await db.getAllCategories();
  res.render("categoryPages/categoryPage", {title: "View and edit stock", links, categories});
}

async function editCategoryGet (req, res) {
  console.log(req.params)
  if (!req.params.categoryid) {
    return res.status(400).render("categoryPages/categoryEditForm", {
        title: "Edit Category",
        links,
        errors: ["Category ID is required"],
      })
  }
  const category = await db.getSelectedCatId(req.params.categoryid)
  res.render("categoryPages/categoryEditForm", {title: "Edit Category", links, category});
}

const editCategoryPost = [
  ...validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).render("categoryPages/categoryEditForm", {
        title: "Edit Category",
        links,
        errors: errors.array(),
      })
    }
    const { categoryTitle } = matchedData(req);
    
    const category = await db.getSelectedCatId(req.params.categoryid)
    await db.editCategory(categoryTitle, req.params.categoryid, category);
    res.redirect('/');
  }
]

async function newCategoryGet (req, res) {
  res.render("categoryPages/categoryNewForm", {title: "New Category Entry", links});
}

const newCategoryPost = [
  ...validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).render("categoryPages/categoryNewForm", {
        title: "New Category",
        links,
        errors: errors.array(),
      })
    }
    const { categoryTitle } = matchedData(req);
    
    await db.addNewCategory(categoryTitle);
    res.redirect('/');
  }
]

module.exports = {
  allStockGet,
  createStockGet,
  createStockPost,
  editStockGet,
  editStockPost,
  deleteStockGet,
  deleteStockPost,
  viewCategoriesGet,
  editCategoryGet,
  editCategoryPost,
  newCategoryGet,
  newCategoryPost
};

