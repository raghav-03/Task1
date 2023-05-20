const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");
exports.islogin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token === undefined) {
      return res.status(401).send({
        success: false,
        // message: "Login First",
      });
    } else {
      var decoded = jwt.verify(token, process.env.Secret_key);
      let user = await User.findById(decoded.id);
      if (user) {
        req.User = user;
        next();
      } else {
        return res.status(401).json({
          success: false,
          // message: "Login First!!",
        });
      }
    }
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

// exports.isadmin=async (req,res,next)=>{
//     const { token } = req.cookies;
//     if(token===undefined){
//         return res.status(401).send({
//             success:false,
//             message:"Login First"
//         });
//     }
//     else{
//         var decoded = jwt.verify(token, process.env.Secret_key);
//         let user=await User.findById(decoded.id);
//         if(user && user.role!=process.env.role){
//             req.User=user;
//             next();
//         }else{
//             return res.status(401).send({
//                 success:false,
//                 message:"Admin Only"
//             });
//         }
//     }
// }
