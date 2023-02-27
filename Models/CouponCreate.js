const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  minOrderValue: { type: Number, required: true },
  maxDiscountValue: { type: Number, required: true },
  description: { type: String },
  valid: { type: Boolean, default: true },
  created_at: { type: Date, default: new Date() },
  expired_at: {
    type: Date,
    default: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Coupon", couponSchema);
