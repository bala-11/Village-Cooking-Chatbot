const {Schema,model} = require("mongoose");

const adminSchema = new Schema(
  {
    food_name: {
      type: String,
      trim: true,
    },
    food_price: {
      type: Number,
      trim: true,
    },
    food_picture:{
      type:String,
      trim : true,
    }
  },
);

const adminModel = model("foods", adminSchema);

module.exports = adminModel;