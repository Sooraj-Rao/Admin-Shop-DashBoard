import express from "express";
import { Usermodel } from "../../Model/Admin/User.js";
import { Shopmodel } from "../../Model/Admin/Shop.js";
import { contactModel } from "../../Model/Admin/Contact.js";
import { AdminMsgModel } from "../../Model/Admin/AdminMsg.js";
import { loginModel } from "../../Model/Auth/Auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "admin@gmail.com" && password == "admin123") {
      return res.json({ message: "Login Succesful ADMIN",code:"admin" });
    } else {
      try {
        const result = await Shopmodel.findOne({ shopEmail: email });
        if (result) {
          if (result.password === password) {
            console.log('Matchimg Passwrd');
            return res.json({ message: `Login Succesful ${result.shopName} `,code:result._id ,shop:true});
          }else{
            console.log('Pssword weong');
            return res.json({ message: `Password is incorrrect `,shop:false }); 
          }
        } else {
          console.log('Inlaid email');
          return res.json({ message: "Invalid Email",shop:false });
        }
      } catch (error) {
        console.log(error);
        return res.json({ message: "login Failed" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Failed BackEnd" });
  }
});

export { router as AuthRouter };
