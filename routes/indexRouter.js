const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.allStockGet);
indexRouter.get("/createStockForm", indexController.createStockGet);
indexRouter.post("/createStockForm", indexController.createStockPost);
indexRouter.get("/stockEditForm/:stockid", indexController.editStockGet);
indexRouter.post("/stockEditForm/:stockid", indexController.editStockPost)


module.exports = indexRouter;