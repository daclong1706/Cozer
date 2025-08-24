const mongoose = require("mongoose");

require("dotenv").config();

const dbName = process.env.DATABASE_NAME || "test";
const uri = `mongodb+srv://${
  process.env.DATABASE_USERNAME
}:${encodeURIComponent(
  process.env.DATABASE_PASSWORD
)}@cluster0.abjmm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    // Log an obscured preview of the URI so bạn biết server dùng URI đúng
    console.log("🔌 Connecting to MongoDB...");
    console.log(
      "URI preview:",
      uri.replace(/:\/\/(.*?):(.*?)@/, "://$1:*****@")
    );

    await mongoose.connect(uri, {
      // Các option hiện tại đã được driver quản lý, nhưng thêm một số option hữu ích:
      serverSelectionTimeoutMS: 10000, // 10s chờ primary
      socketTimeoutMS: 45000,
      family: 4, // ép dùng IPv4 — cứu nhiều trường hợp DNS/IPv6 bị mạng chặn
    });

    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed (full error):");
    console.error(err && err.stack ? err.stack : err);
    // Không exit để nodemon còn restart; nếu bạn muốn app dừng thì giữ process.exit(1)
    process.exit(1);
  }
};

module.exports = connectDB;
