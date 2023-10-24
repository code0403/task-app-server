const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.model");


// middleware/authRoleMiddleware.js
const authRoleMiddleware = (req, res, next) => {
  
  // const token = req.headers.authorization;
  // let personRole;

  //   if(token){
  //       jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
  //           if(decoded){
  //               console.log(decoded)
  //               const person =  await UserModel.find({_id:decoded.userID})
  //               personRole = person[0].role
  //               console.log(personRole)        
  //           }
  //       })

        if (req.user.role=== 'Admin') {
          // Allow access for admin users or the task creator
          next();
        } else {
          // Deny access for others
          return res.status(403).json({ message: "Permission denied." });
        } 
    // }

    
};
  
module.exports = { authRoleMiddleware };
  