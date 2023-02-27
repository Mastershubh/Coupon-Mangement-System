var validator = require("validator");
const validation = (req, res, next) => {
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
    if (
      validator.isAlphanumeric(couponCode) &&
      validator.isNumeric(discount) &&
      validator.isNumeric(minOrderValue) &&
      validator.isNumeric(maxDiscountValue) &&
      validator.isAlphanumeric(description) &&
      validator.isBoolean(valid) &&
      validator.isDate(created_at) &&
      validator.isDate(expired_at)
    )
    next();
    else {
        return res.status(400).send("Invalid Data");
    }
      
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Please provide inputs");
  }
};

module.exports = validation;
