const jwt = require('jsonwebtoken');

const Authentication = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if (token === "null" || !token) {
            return res.json({ loggedIn: false });
        } else {
            const payload = jwt.verify(token, "shomik-1234");
            req.user = payload;
            next();
        }
    } catch (error) {
        console.error("Error in Authentication: ", error);
        return res.send("Internal server error");//return jason here;
    }
};

const Authorization = async(req, res, next)=>{
    try{
        const token = req.cookies.token;
        // console.log("here is req.user: ")
        // console.log(req.user);
        if(!token){
            return res.redirect("/login")
        }
        else{
            const payload = jwt.verify(token, "shomik-1234");
            if(payload.role === "admin"){
                next();
            }
            else{
                res.redirect("/")
            }
        }
        // if(req.user.role == "admin"){
        //     next();
        // }
        // else{
        //     res.redirect("/")
        // }
    }catch(error){
        console.error("error check token", error);
        return res.send("internal server error");
    }
}

module.exports = {Authorization, Authentication};