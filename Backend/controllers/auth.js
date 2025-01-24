const User = require("../models/user");
const bcrypt = require('bcrypt'); //is this need here too?
const jwt = require("jsonwebtoken") //is this need here too?

const login = async(req, res)=>{
    const {username, password} = req.body;
    try{
        const findUser = await User.findOne({username});
        if(!findUser){
            return res.redirect("/login");
        }
        let pass = await bcrypt.compare(password,findUser.password);
        if(findUser && pass){
            const payload = {
                id: findUser._id,
                email: findUser.email,
                username: findUser.username,
                role: findUser.role
            }
            console.log(payload);
            const token =  jwt.sign(payload,"shomik-1234",{
                expiresIn: "24h",
            })
            res.cookie("token", token);
            const isAdmin = findUser.role === 'admin' ? 'true' : 'false';
            res.cookie("isAdmin", isAdmin);
            return res.redirect("/");
            // user = user.toObject();
            // user.token = token;
            // user.password = undefined;

            // const options = {
            //     expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            //     httpOnly : true,
            // }

            // res.cookie("token",token,options).status(200).json({
            //     success : true,
            //     token,
            //     user,
            //     message:"User logged in successfully"
            // });
        } 
        else{
            return res.redirect("/login");
        }
    }
    catch(error){
        if(error){
            console.error("ERROR: ", error);
            console.log("internal server error");
            res.status(500).send("internal server error");
        }
    }
}


const signup = async (req, res) => {
    const { email, username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect("/signup");
    }
    else {
      let hashPass;
      try{
        hashPass = await bcrypt.hash(password,10);
      }
      catch(error){
        console.error("error hashing the password", error);
        return res.send("internal server error");
      }
      await User.create({ email, username, password: hashPass, role: "user"});
      return res.redirect("/login");
    }
  }
  catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res) => {
    // Remove the token from the client-side storage (e.g., cookies)
    res.clearCookie('token');

    // Redirect the user to the login page
    res.redirect("/");
}

module.exports = {login, signup, logout};
