const orderDB = require("../models/userOrderDB");

exports.createUserOrder = async (req,res) =>{
    try {
        const newItem = await orderDB.create(req.body);
        res.status(201)
            .json({
              message : "Food item is added in menu..." , newItem
            });
    } catch (error) {
        console.error(error.message);
    }
};

exports.getOrderDetails = async (req,res) =>{
    try {
        const orderDetails = await orderDB.find();
        res.status(200).send(orderDetails)
    } catch (error) {
        console.error(error.message);
    }
};

exports.deleteOrder = async (req,res) =>{
    try {
        const id = req.params.id;
        await orderDB.findByIdAndDelete(id);
        res.status(200).send("Your order is deleted");
    } catch (error) {
        console.error(error.message);
    }
};