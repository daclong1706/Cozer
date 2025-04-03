const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true, // Đường/Số nhà bắt buộc
      trim: true, // Xóa khoảng trắng thừa
    },
    ward: {
      type: String,
      required: true, // Phường/Xã
      trim: true,
    },
    district: {
      type: String,
      required: true, // Quận/Huyện
      trim: true,
    },
    city: {
      type: String,
      required: true, // Tỉnh/Thành phố
      trim: true,
    },
    postalCode: {
      type: String,
      required: false, // Mã bưu chính (không bắt buộc)
      trim: true,
    },
    country: {
      type: String,
      required: true,
      default: "Vietnam", // Mặc định là Việt Nam
    },
    addressType: {
      type: String,
      enum: ["home", "office", "other"], // Các loại địa chỉ hợp lệ
      default: "home", // Loại mặc định
      required: true,
    },
  },
  {
    timestamps: true, // Thêm createdAt và updatedAt tự động
  }
);

module.exports = addressSchema;
