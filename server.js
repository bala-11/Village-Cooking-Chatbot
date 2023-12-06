const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors")
require("colors");
var jwtlib = require("jsonwebtoken")

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("./public"))
// call connectDB to get db connection
connectDB();
// loginDB();

const routes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/userOrderRoutes")
const registerRoutes = require("./routes/registerRoutes")
// used to call routes with the help of app , then routes directs to the specified location
app.use('/',routes);
app.use('/',orderRoutes)
app.use('/',registerRoutes)
const PORT = 5000;


// jwt global variable
var useremail;

app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`.brightMagenta.bold);
});

app.get("/sts", (req, res) => {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-methods": "*",
    });
    const jwt = generateJWTForOTTBot();
    data = { jwt: jwt };

// get token from kore-widgets-chat-main
    let userToken = req.get("Auth");
    useremail = decodeToken(userToken);




    res.send(JSON.stringify(data));
  });
  
  function generateJWTForOTTBot() {
    const payload = {
      iat: new Date().getTime() / 1000,
      exp: new Date().getTime() / 1000 + 86400,
      aud: "https://idproxy.kore.ai/authorize",
      iss: "cs-53c7d40d-711c-5703-9c5d-892d5f8bebeb",
      sub: useremail
    };
    const secret = "+Dks+P5wF/Cx0m9nez5amh6D0JENzFndu12HPoTZW5w=";
    var token = jwtlib.sign(payload, secret);
    return token;
  }

  function decodeToken(userToken){
    let decodedToken = jwtlib.decode(userToken,{complete:true});
    // console.log(decodedToken);
    // console.log(decodedToken.payload.user.email);
    return decodedToken.payload.user.email;
 }