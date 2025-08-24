// testMongo.js
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://daclongk17:SZm5RMIRGfG6ZhAw@cluster0.abjmm.mongodb.net/cozerDB?retryWrites=true&w=majority";

(async () => {
  try {
    console.log("🔌 Trying to connect ...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // force IPv4 (helpful on some mạng)
    });
    console.log("✅ Connected to MongoDB Atlas");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Connection error (detailed):", err);
    process.exit(1);
  }
})();
