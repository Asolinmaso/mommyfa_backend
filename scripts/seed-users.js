// Run this script with: node scripts/seed-users.js
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Define User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "seller", "buyer"],
    default: "buyer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Create User model
const User = mongoose.models.User || mongoose.model("User", UserSchema)

// Seed users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({})
    console.log("Cleared existing users")

    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const adminPassword = await bcrypt.hash("admin123", salt)
    const sellerPassword = await bcrypt.hash("seller123", salt)
    const buyerPassword = await bcrypt.hash("buyer123", salt)

    // Create users
    const users = [
      {
        name: "Admin User",
        email: "admin@mommyfarm.com",
        password: adminPassword,
        role: "admin",
      },
      {
        name: "Seller User",
        email: "seller@mommyfarm.com",
        password: sellerPassword,
        role: "seller",
      },
      {
        name: "Buyer User",
        email: "buyer@mommyfarm.com",
        password: buyerPassword,
        role: "buyer",
      },
    ]

    await User.insertMany(users)
    console.log("Users seeded successfully")

    // Log the created users (without passwords)
    console.log("Created users:")
    users.forEach((user) => {
      console.log(`- ${user.name} (${user.email}), Role: ${user.role}`)
    })

    process.exit(0)
  } catch (error) {
    console.error("Error seeding users:", error)
    process.exit(1)
  }
}

seedUsers()
