const express = require("express");
const router = express.Router();
const validation=require("../Middleware/validate");
const {
  couponCreate,
  couponDelete,
  couponUpdate,
  couponGetAll,
  couponGetOne,
} = require("../Controller/CouponController");

router.get("/getall", couponGetAll);

router.post("/create", validation,couponCreate);

router.put("/edite/:id", couponUpdate);

router.delete("/delete/:id", couponDelete);

router.get("/getOne/:id", couponGetOne);

module.exports = router;
