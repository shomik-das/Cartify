const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
const dataBase = require("./config/dataBase"); dataBase();
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser');
const loginSignRoute = require("./routes/loginSignRoute");
const dashboard = require("./routes/dashBoard");
const crud = require("./routes/crud");
const cart = require("./routes/cart");
const cors = require('cors');
const {Authorization, Authentication} = require("./middlewares/Auth");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname , "/public/upload")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors()
)
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})

app.use("/dashboard/v1", dashboard);
app.use("/user/v1", loginSignRoute);
app.use("/crud/v1", crud);
app.use("/cart/v1",cart);

app.set("view engine","ejs");


app.get("/login",(req,res)=>{
    res.redirect("http://localhost:5500/FrontEnd/login.html");
})
app.get("/signup",(req,res)=>{
    res.redirect("http://localhost:5500/FrontEnd/signup.html");
})
app.get("/",(req,res)=>{
    //res.send(path.join(__dirname, "../FrontEnd/dashboard.html")); //why this is not working
    res.redirect("http://localhost:5500/FrontEnd/dashboard.html");
})
app.get("/admin",Authorization, (req,res)=>{
    console.log(req.user);
    res.redirect("http://localhost:5500/FrontEnd/upload.html");
})


app.use((req, res) => {
    res.status(404).send("Page not found");
});
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
