const mongoose = require("mongoose");
const addressSchema = require("./Address");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    accountStatus: {
      type: String, // Trạng thái tài khoản
      enum: ["active", "inactive", "pending"], // Các trạng thái hợp lệ
      default: "active", // Mặc định tài khoản kích hoạt
    },
    addresses: [addressSchema], // Nhúng addressSchema (nhiều địa chỉ)
    dateOfBirth: {
      type: Date, // Kiểu ngày
      required: false, // Không bắt buộc
    },
    createdAt: {
      type: Date,
      default: Date.now, // Tự động thêm thời gian tạo
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Tự động thêm thời gian cập nhật
    },
  },
  { timestamps: true }
);

// Password Hash middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match User entered passworrd to Hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
