// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const Product = require("./models/Product");
// const User = require("./models/User");
// const Cart = require("./models/Cart");
// const products = require("./data/products");

// dotenv.config();

// //Connect to mongoDB
// mongoose.connect(process.env.MONGO_URI);

// // Function to seed data

// const seedData = async () => {
//   try {
//     // Clear existing data
//     await Product.deleteMany();
//     await User.deleteMany();
//     await Cart.deleteMany();

//     // Create a default admin User
//     const createdUser = await User.create({
//       name: "Admin User",
//       email: "admin@example.com",
//       password: "123456",
//       role: "admin",
//     });

//     // Assign the default user ID to each product
//     const userID = createdUser._id;

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: userID };
//     });

//     // Insert the products into the database
//     await Product.insertMany(sampleProducts);

//     console.log("Product data seeded successfully!");
//     process.exit();
//   } catch (error) {
//     console.error("Error seeding the data", error);
//     process.exit(1);
//   }
// };

// seedData();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User"); // Model User
const users = require("./data/users"); // File chứa mock data người dùng

dotenv.config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  try {
    // Xóa toàn bộ dữ liệu cũ
    await User.deleteMany();

    // Lặp qua từng người dùng để tạo mới và hash mật khẩu
    for (const user of users) {
      await User.create(user); // Sử dụng create để đảm bảo mật khẩu được mã hóa
    }

    console.log("User data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding user data", error);
    process.exit(1);
  }
};

seedUsers();
