import express from "express";
import { Usermodel } from "../../Model/Admin/User.js";
import { Shopmodel } from "../../Model/Admin/Shop.js";
import { contactModel } from "../../Model/Admin/Contact.js";
import { ServiceModel } from "../../Model/Shop/Service.js";
import { BookedServiceModel } from "../../Model/Shop/BookedService.js";
import { UserToShopMsgModel } from "../../Model/Shop/UserShopMessage.js";
import { BillModel } from "../../Model/Shop/Bill.js";

const router = express.Router();

//Add Message

router.post("/ShopAddMessage", async (req, res) => {
  try {
    const { email, message, type } = req.body;
    const NewMessage = new contactModel({
      email,
      message,
      type,
    });
    await NewMessage.save();
    res.json({ message: "Message Sent" });
  } catch (error) {
    res.json({ message: "Some Error Occurred in BackEnd" });
    console.log("Messag Add Error: ", error);
  }
});

//View Message
router.get("/ShopAddMessage/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const Message = await contactModel.find({ email: email });
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Message-BackEnd" });
  }
});

//Delete Message
router.delete("/shopAddMessage/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Message = await contactModel.deleteOne({ _id: id });
    if (Message.deletedCount === 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "Shop Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting Message - BakcEnd" });
    console.log(error);
  }
});

//Manage Shop

router.get("/manageShop/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Message = await Shopmodel.find({ _id: id });
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Message-BackEnd" });
  }
});

// Add Service

router.post("/addService", async (req, res) => {
  const { shopId, serviceName, vehicleType, serviceImage, serviceCost } =
    req.body;
  console.log(req.body);
  const Service = await ServiceModel.find({ shopId });
  const checkType = Service.some(
    (service) =>
      service.vehicleType == vehicleType && service.serviceName == serviceName
  );
  console.log(checkType);
  if (checkType) {
    return res.json({
      message: `${serviceName} for ${vehicleType}  Already Exist`,
    });
  }
  try {
    const NewService = new ServiceModel({
      shopId,
      serviceName,
      vehicleType,
      serviceImage,
      serviceCost,
    });
    await NewService.save();
    console.log(NewService);
    res.json({ message: "Service Added" });
  } catch (error) {
    res.json({ message: "Some Error Occurred in BackEnd" });
    console.log("Service Add Error: ", error);
  }
});

// View Service

router.get("/viewService/:shopId", async (req, res) => {
  const { shopId } = req.params;
  try {
    const Service = await ServiceModel.find({ shopId });
    res.json(Service);
  } catch (error) {
    return res.json({ message: "Error Viewing Services -BackEnd" });
  }
});

//Delete Service
router.delete("/viewService/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Service = await ServiceModel.findByIdAndDelete(id);
    if (Service.deletedCount == 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "Service Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting Service - BakcEnd" });
    console.log(error);
  }
});

//View Request

router.get("/viewRequest/:shopId", async (req, res) => {
  const { shopId } = req.params;
  try {
    const Services = await BookedServiceModel.find({ shopId });
    res.json(Services);
  } catch (error) {
    return res.json({ message: "Error Viewing Requests -BackEnd" });
  }
});

//Delete Request
router.delete("/viewRequest/delete/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const Request = await BookedServiceModel.deleteOne({ _id: id });
    if (Request.deletedCount == 1) {
      return res.json({ message: "Successfully Deleted" });
    } else {
      return res.json({ message: "Request Doesnt Exist" });
    }
  } catch (error) {
    res.json({ message: "Error deleting Request - BakcEnd" });
    console.log(error);
  }
});

//Confirm Request

router.post("/viewRequest/confirm/:requestId", async (req, res) => {
  const { requestId } = req.params;
  try {
    let status = "Service Approved";
    await BookedServiceModel.updateOne(
      { _id: requestId },
      { $set: { status } }
    );
    res.json({ message: "Service Request Succefully Approved " });
  } catch (error) {
    res.json({ message: "Confirm Failed in BackEnd" });
    console.log("confirm Error: ", error);
  }
});

//View Message
router.get("/viewMessage/:shopId", async (req, res) => {
  const { shopId } = req.params;
  try {
    const Message = await UserToShopMsgModel.find({ shopId });
    res.json(Message);
  } catch (error) {
    return res.json({ message: "Error Viewing Message-BackEnd" });
  }
});

//Bill Generation
router.post("/bill", async (req, res) => {
  const {
    _id,
    userId,
    shopId,
    userName,
    serviceName,
    serviceCost,
    userPhone,
    userEmail,
    vehicleType,
    shopName,
    discount,
    total,
  } = req.body;
  try {
    let bill = "Bill Generated";
    await BookedServiceModel.updateOne({ _id }, { $set: { bill } });
    const Bill = new BillModel({
      userId,
      shopId,
      userName,
      serviceName,
      serviceCost,
      userPhone,
      userEmail,
      vehicleType,
      shopName,
      discount,
      total,
    });
    await Bill.save();
    res.json({ message: `Successfully generated Bill for ${userName}` });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error Bill Generation -BackEnd" });
  }
});

//View Bills
router.get("/viewBill/:shopId", async (req, res) => {
  const { shopId } = req.params;
  try {
    const Bills = await BillModel.find({ shopId });
    res.json(Bills);
  } catch (error) {
    return res.json({ message: "Error Viewing Bills-BackEnd" });
  }
});

//Update Shop

router.post("/manageShop/", async (req, res) => {
  const { shopId } = req.body;

  try {
    let status = "Service Approved";
    await BookedServiceModel.updateOne({ _id: shopId }, { $set: { status } });
    res.json({ message: "Service Request Succefully Approved " });
  } catch (error) {
    res.json({ message: "Confirm Failed in BackEnd" });
    console.log("confirm Error: ", error);
  }
});
export { router as ShopRouter };
