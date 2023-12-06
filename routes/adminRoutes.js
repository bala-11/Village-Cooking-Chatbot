const router = require("express").Router();

const controller = require("../controllers/adminController");

router
    .post('/createitem',controller.createItem)
    .get('/getitems',controller.getItems)
    .get('/getitem/:id',controller.getItemById)
router
    .put("/updateitem/:id",controller.updateItem)
    .delete("/deleteitem/:id",controller.deleteItem)


module.exports = router;