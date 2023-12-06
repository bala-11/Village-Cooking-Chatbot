const User = require("../models/registerDB");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");


//get all items
exports.getallitems = async(req, res) => {
    try {
        const itemdetails = await Items.find({});
        res.status(200).json(itemdetails);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
//get items by id
// exports.getitemsbyid= async(req, res) =>{
//     try {
//         const {id} = req.params;
//         const specificitem = await Items.findById(id);
    
//         res.status(200).json(specificitem);
//     } catch (error) {
//         res.status(400).json({message: `You Entered Wrong ItemId`})
//     }
// }
//create new item
exports.createitem = async (req, res, next) => {
        const { username, email, password, role } = req.body;
        if(!username || !email || !password || !role)
          return res.status(400).send("Please fill in all the required fields!")
        try {
          const userObj = { username, email, role };
          const hashedPwd = await hash(password, 12);
          userObj.password = hashedPwd;
          const user = await new User(userObj).save();
          console.log(user);
          const token = sign({ [role]: user }, process.env.JWT_SECRET, { expiresIn: 360000 });
          return res
            .status(201)
            .json(role === "user" ? { token, user: { ...user._doc, password: null } } : { token, admin: { ...user._doc, password: null } });
        } catch (error) {
          return res.status(500).send(error.message);
        }
    };

//login
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    if (user.role !== "user")
      return res.status(404).send("Invalid credentials..");
    const isMatch = await compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    console.log(token);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// // update an item by id
// exports.updateitembyid= async(req, res) => {
//     try {
//         const {id} = req.params;
//         const option={new:true};
//         const edititem = await Items.findByIdAndUpdate(id, req.body,option);

//         const updateditem = await Items.findById(id);
//         res.status(200).json(edititem);
        
//     } catch (error) {
//         res.status(400).json({message: `You Entered Wrong ItemId`})
//     }
// }
// // delete an item by id
// exports.deleteitembyid= async(req, res) =>{
//     try {
//         const {id} = req.params;
//         const delitem = await Items.findByIdAndDelete(id);
//         res.status(200).json(delitem);
        
//     } catch (error) {
//         res.status(400).json({message: `You Entered Wrong ItemId`})
//     }
// }
//200 - ok(success)
//201 - created
//400 - Badrequest
//404 - resourse not found
exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?._id).select("-password").lean();
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ ...user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};