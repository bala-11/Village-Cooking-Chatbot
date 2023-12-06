//routes
const { Router } = require("express");

const userLoggedDetails = require("../controllers/registerController");

const router = Router({ strict: true });

const isAuth = require("../middleware/is-user");

// router.get("/getusers", userLoggedDetails.getallitems);
// router.get("/getbyid/:id",userLoggedDetails.getitemsbyid);
router.post("/adduser", userLoggedDetails.createitem);
router.post("/login",userLoggedDetails.login);

router.get("/auth-user", isAuth, userLoggedDetails.getAuthUser);
// router.put("/updateitem/:id",userLoggedDetails.updateitembyid);
// router.delete("/deleteitem/:id",userLoggedDetails.deleteitembyid);

module.exports = router;

