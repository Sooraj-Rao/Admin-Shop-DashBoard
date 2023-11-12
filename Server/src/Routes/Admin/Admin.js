import express from "express";
import { Usermodel } from "../../Model/Admin/User.js";
import { Shopmodel } from "../../Model/Admin/Shop.js";
import { contactModel } from "../../Model/Admin/Contact.js";
import { AdminMsgModel } from "../../Model/Admin/AdminMsg.js";

const router = express.Router();

//Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const Shops = await Shopmodel.find({});
    const ShopLength = Shops.length;
    const Users = await Usermodel.find({});
    const UserLength = Users.length;
    const Message = await AdminMsgModel.find({});
    const MessageLength = Message.length;
    const Contacts = await contactModel.find({});
    const ContactsLength = Contacts.length;
    res.json({
      ShopLength: ShopLength,
      UserLength: UserLength,
      MessageLength: MessageLength,
      ContactsLength: ContactsLength,
    });
  } catch (error) {
    return res.json({ message: "Error Dashoboard Shop -BackEnd" });
  }
});

//Add Shop

router.post("/addShop", async (req, res) => {
  const { shopName, shopAddress, shopPincode, password, shopImage, shopEmail } =
    req.body;
  const Shop = await Shopmodel.findOne({
    $or: [{ shopName: shopName }, { shopEmail: shopEmail }],
  });
  try {
    if (Shop) {
      console.log(Shop);
      if (Shop.shopName === shopName)
        return res.json({ message: "Shop name Already exist" });

      if (Shop.shopEmail === shopEmail)
        return res.json({ message: "Owner Email Alreay Exist" });
    } else {
      const NewShop = new Shopmodel({
        shopName,
        shopAddress,
        shopPincode,
        password,
        shopImage,
        shopEmail,
      });
      await NewShop.save();
      res.json({ message: "Successfully Added Shop" });
    }
  } catch (error) {
    res.json({ message: "Some Error Occurred in BackEnd" });
    console.log("Registration Error: ", error);
  }
});

//View Shop

router.get("/viewShop", async (req, res) => {
  try {
    const Shops = await Shopmodel.find({});
    res.json(Shops);
  } catch (error) {
    return res.json({ message: "Error Viewing Shop -BackEnd" });
  }
});

//Delete shop
router.delete("/viewShop/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Shop = await Shopmodel.deleteOne({ _id: id });
    if (Shop.deletedCount === 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "Shop Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting Shop - BakcEnd" });
    console.log(error);
  }
});

//Admin Message Add

router.post("/addMessage", async (req, res) => {
  try {
    const { MessageTitle, Message } = req.body;

    const NewMessage = new AdminMsgModel({
      MessageTitle,
      Message,
    });
    await NewMessage.save();
    res.json({ message: "Message Added" });
  } catch (error) {
    res.json({ message: "Some Error Occurred in BackEnd" });
    console.log("Messag Add Error: ", error);
  }
});

//View Message
router.get("/addMessage", async (req, res) => {
  try {
    const Message = await AdminMsgModel.find({});
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Message-BackEnd" });
  }
});

//Delete Message

router.delete("/addMessage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Message = await AdminMsgModel.deleteOne({ _id: id });
    if (Message.deletedCount === 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "Message Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting Message - BakcEnd" });
    console.log(error);
  }
});

//View User

router.get("/viewUser", async (req, res) => {
  try {
    const Message = await Usermodel.find({});
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Users-BackEnd" });
  }
});

//Delete User

router.delete("/viewUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await Usermodel.deleteOne({ _id: id });
    if (User.deletedCount === 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "User Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting User - BakcEnd" });
    console.log(error);
  }
});

//View  Message

router.get("/viewUserMessage/:type", async (req, res) => {
  const { type } = req.params;
  try {
    const Message = await contactModel.find({type:type});
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Message-BackEnd" });
  }
});

//Delete  Message

router.delete("/viewUserMessage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const UserMessage = await contactModel.deleteOne({ _id: id });
    if (UserMessage.deletedCount === 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "User Message Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting User Message - BakcEnd" });
    console.log(error);
  }
});


export { router as AdminRouter };
