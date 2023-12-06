const adminDB = require("../models/adminDB");

exports.createItem = async (req, res) => {
    try {
      // get the task from the body
      const ItemData = await req.body;
      //create a new task then save
      await adminDB.create(ItemData)
        .then((createdItem) => {
          if (!createdItem) return res.status(404)
            .json({
              success: false,
              message: "Item creation failed",
              error: "Unable get created Item"
            })
          res.status(201)
            .json({
              message : "Food item is added in menu..." , ItemData
            });
        })
        .catch((error) => {
          res.status(404)
            .json({
              success: false,
              error: error.message
            })
        })
    } catch (error) {
      res.status(500)
        .json({
          success: false,
          message: "Internal server error"
        })
    }
  }


// get all food items 
  exports.getItems = async (req, res) => {
    //get all the data in the model and return it as response
    try {
       const allItems = await adminDB.find();
       res.status(200).json(allItems);

    } catch (error) {
      res.status(500).json({message: "Internal server error",error: error.message})
    }
  }
// get items by id
exports.getItemById = async (req, res) => {
  //get all the data in the model and return it as response
  try {
     const id = req.params.id;
     const specificItem = await adminDB.findById(id);
     res.status(200).json(specificItem);

  } catch (error) {
    res.status(500).json({message: "Internal server error",error: error.message})
  }
}


// update a specific food item
exports.updateItem = async (req,res) => {
  try {
    const id = req.params.id;
    const opt = {new:true};
    const updateItem = await adminDB.findByIdAndUpdate(id,req.body,opt);
    res.status(200).json({
      message  : "Food item details is updated..." , updateItem
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({message:error});
  }
}

// Delete the specific transaction 
exports.deleteItem = async (req,res) =>{
  try {
    const id = req.params.id;
    await adminDB.findByIdAndDelete(id);
    res.status(200).send("Food Item is removed from the menu...");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal server error");
  }
}
