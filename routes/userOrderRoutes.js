const orderRouter = require("express").Router();

const orderController = require("../controllers/orderController");

orderRouter
    .post("/addorders",orderController.createUserOrder)
    .get("/getorder",orderController.getOrderDetails)
    .delete("/deleteorder/:id",orderController.deleteOrder)


module.exports = orderRouter;