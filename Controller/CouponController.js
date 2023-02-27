const Coupon = require("../Models/CouponCreate");

const couponCreate = async (req, res) => {
  const {
    couponCode,
    discount,
    minOrderValue,
    maxDiscountValue,
    description,
    valid,
    created_at,
    expired_at,
  } = req.body;
  
  try {
  
    let duplicate = await Coupon.find(code);
    if (duplicate)
      return res.status(401).json({ message: "Coupon name already exists" });
    const newCoupon = new Coupon({
      couponCode: couponCode,
      discount: discount,
      minOrderValue: minOrderValue,
      maxDiscountValue: maxDiscountValue,
      description: description,
      valid: valid,
      created_at: created_at,
      expired_at: expired_at,
    });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const couponUpdate = async (req, res) => {
  try {
    let updatedCoupon = await Coupon.findById(req.params.id);
    if (!updatedCoupon) {
      return res.status(400).json({ message: "No such Coupon exist" });
    }
    updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    // console.log(updatedCoupon);
    res.status(200).send(updatedCoupon);
  } catch (error) {
    res.stauts(500).send(error);
  }
};

const couponDelete = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon)
      res.status(400).json({ message: "There is no such Coupon exist" });
    coupon.remove();
    res.ststus(200).json({ message: "coupon is deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: "error in code" });
  }
};

const couponGetAll = async (req, res) => {
  try {
     checkValidation();
    const coupon = await Coupon.find({});
    if (coupon.length==0) return res.status(404).json({ message: "No Coupon is found" });
    res.status(200).json({ message: coupon });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const couponGetOne = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon)
      return res.status(400).json({ message: "There is no such Coupon exist" });

    res.status(200).json({ messsage: coupon });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const checkValidation = async () => {
  const currentDate = new Date();
  try {
    await Coupon.updateMany(
       { expired_at: { $lte: currentDate } },
      { valid: false }
    );
  } catch (error) {
    console.log(error);
  }
  
  
  
};
module.exports = {
  couponCreate,
  couponDelete,
  couponUpdate,
  couponGetAll,
  couponGetOne,
};
