const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();


indexRouter.get("/", indexController.allStockGet);
indexRouter.get("/createStockForm", indexController.createStockGet);
indexRouter.post("/createStockForm", indexController.createStockPost);
indexRouter.get("/stockEditForm/:stockid", indexController.editStockGet);
indexRouter.post("/stockEditForm/:stockid", indexController.editStockPost);
indexRouter.get("/delete/:stockid", indexController.deleteStockGet);
indexRouter.post("/delete/:stockid", indexController.deleteStockPost);
indexRouter.get("/viewCategories", indexController.viewCategoriesGet);
indexRouter.get("/editCategory/:categoryid", indexController.editCategoryGet);
indexRouter.post("/editCategory/:categoryid", indexController.editCategoryPost);
indexRouter.get("/deleteCategory/:categoryid", indexController.deleteCategoryGet);
indexRouter.post("/deleteCategory/:categoryid", indexController.deleteCategoryPost);
indexRouter.get("/newCategory", indexController.newCategoryGet);
indexRouter.post("/newCategory", indexController.newCategoryPost);
indexRouter.get("/categoryFilter", indexController.filterStockGet);


module.exports = indexRouter;