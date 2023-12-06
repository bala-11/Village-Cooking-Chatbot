const {Schema,model} = require("mongoose");

const userOrderSchema = new Schema({
  ordereditem: {
    type: String,
    trim: true,
    required: [true, "name is required"],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, "quantity is required"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "price is required"],
  },
});
const userOrderDetails = model("UserOrderDetails", userOrderSchema);

 module.exports = userOrderDetails;
