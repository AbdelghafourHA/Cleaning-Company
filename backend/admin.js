import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/admin.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Admin.deleteMany({ email: "gueddoudacenter@gmail.com" });
    console.log("✅ Removed old admin if existed");

    const admin = new Admin({
      email: "gueddoudacenter@gmail.com",
      password: "Aa12gueddouda12Aa",
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    console.log("📧 Email:", admin.email);
    console.log("🔑 Password: Aa12gueddouda12Aa");

    console.log("\n🔍 Testing password verification...");
    const testMatch = await admin.comparePassword("Aa12gueddouda12Aa");
    console.log(
      "Password verification:",
      testMatch ? "✅ Working" : "❌ Failed"
    );

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

createAdmin();
