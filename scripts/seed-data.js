// Run this script with: node scripts/seed-data.js
import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"

// Load environment variables
dotenv.config()

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Define schemas
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

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  description: String,
  isActive: Boolean,
})

const BrandSchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
  description: String,
  isActive: Boolean,
})

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  category: String,
  subcategory: String,
  brand: String,
  stock: Number,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isActive: Boolean,
  isFeatured: Boolean,
  isNew: Boolean,
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
      review: String,
      date: Date,
    },
  ],
  averageRating: Number,
})

const BannerSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  link: String,
  type: {
    type: String,
    enum: ["hero", "ad"],
  },
  order: Number,
  isActive: Boolean,
})

const EbookSchema = new mongoose.Schema({
  title: String,
  slug: String,
  image: String,
  description: String,
  content: String,
  isActive: Boolean,
})

// Create models
const User = mongoose.models.User || mongoose.model("User", UserSchema)
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema)
const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema)
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema)
const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema)
const Ebook = mongoose.models.Ebook || mongoose.model("Ebook", EbookSchema)

// Seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({})
    await Brand.deleteMany({})
    await Product.deleteMany({})
    await Banner.deleteMany({})
    await Ebook.deleteMany({})
    console.log("Cleared existing data")

    // Create admin user if it doesn't exist
    let adminUser = await User.findOne({ email: "admin@mommyfarm.com" })
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10)
      const adminPassword = await bcrypt.hash("admin123", salt)
      adminUser = await User.create({
        name: "Admin User",
        email: "admin@mommyfarm.com",
        password: adminPassword,
        role: "admin",
      })
      console.log("Created admin user")
    }

    // Create seller user if it doesn't exist
    let sellerUser = await User.findOne({ email: "seller@mommyfarm.com" })
    if (!sellerUser) {
      const salt = await bcrypt.genSalt(10)
      const sellerPassword = await bcrypt.hash("seller123", salt)
      sellerUser = await User.create({
        name: "Seller User",
        email: "seller@mommyfarm.com",
        password: sellerPassword,
        role: "seller",
      })
      console.log("Created seller user")
    }

    // Seed categories
    const categories = [
      {
        name: "Vegetables",
        slug: "vegetables",
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop",
        description: "Fresh organic vegetables directly from farms",
        isActive: true,
      },
      {
        name: "Fruits",
        slug: "fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop",
        description: "Seasonal organic fruits for a healthy lifestyle",
        isActive: true,
      },
      {
        name: "Oils",
        slug: "oils",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop",
        description: "Cold-pressed organic oils for cooking and health",
        isActive: true,
      },
      {
        name: "Dry Fruits",
        slug: "dry-fruits",
        image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=800&auto=format&fit=crop",
        description: "Premium quality organic dry fruits and nuts",
        isActive: true,
      },
      {
        name: "Juices",
        slug: "juices",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop",
        description: "Fresh organic juices without preservatives",
        isActive: true,
      },
    ]

    await Category.insertMany(categories)
    console.log("Categories seeded successfully")

    // Seed brands
    const brands = [
      {
        name: "Nature's Basket",
        slug: "natures-basket",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
        description: "Premium organic products for a healthier lifestyle",
        isActive: true,
      },
      {
        name: "Organic Valley",
        slug: "organic-valley",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop",
        description: "Farm-fresh organic products from sustainable farms",
        isActive: true,
      },
      {
        name: "Green Harvest",
        slug: "green-harvest",
        image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&auto=format&fit=crop",
        description: "Certified organic products from local farmers",
        isActive: true,
      },
      {
        name: "Pure Earth",
        slug: "pure-earth",
        image: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&auto=format&fit=crop",
        description: "Eco-friendly organic products for conscious consumers",
        isActive: true,
      },
      {
        name: "Wholesome Foods",
        slug: "wholesome-foods",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
        description: "Nutritious and delicious organic food products",
        isActive: true,
      },
    ]

    await Brand.insertMany(brands)
    console.log("Brands seeded successfully")

    // Seed products
    const products = [
      // Vegetables
      {
        name: "Organic Carrots (1kg)",
        description:
          "Fresh organic carrots grown without pesticides. Rich in beta-carotene and antioxidants.\n\nOur carrots are harvested at the peak of freshness to ensure maximum flavor and nutritional value. They are perfect for salads, juicing, or cooking.",
        price: 3.99,
        originalPrice: 4.99,
        images: [
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&auto=format&fit=crop",
        ],
        category: "vegetables",
        brand: "Nature's Basket",
        stock: 100,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: true,
        averageRating: 4.5,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "Very fresh and tasty carrots!",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4,
            review: "Good quality and fresh.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Spinach (500g)",
        description:
          "Fresh organic spinach leaves, rich in iron and vitamins.\n\nOur spinach is grown using sustainable farming practices and harvested at the peak of freshness. Perfect for salads, smoothies, or cooking.",
        price: 2.49,
        originalPrice: 2.99,
        images: [
          "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=800&auto=format&fit=crop",
        ],
        category: "vegetables",
        brand: "Green Harvest",
        stock: 75,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: false,
        isNew: false,
        averageRating: 4.0,
        ratings: [
          {
            user: adminUser._id,
            rating: 4,
            review: "Fresh and crisp spinach leaves.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Tomatoes (1kg)",
        description:
          "Juicy organic tomatoes, perfect for salads and cooking.\n\nOur tomatoes are grown in nutrient-rich soil without synthetic pesticides or fertilizers. They are harvested when fully ripe for maximum flavor.",
        price: 4.99,
        originalPrice: 5.99,
        images: [
          "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop",
        ],
        category: "vegetables",
        brand: "Organic Valley",
        stock: 60,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: false,
        averageRating: 4.8,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "These tomatoes are incredibly flavorful!",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.5,
            review: "Great quality and taste.",
            date: new Date(),
          },
        ],
      },

      // Fruits
      {
        name: "Organic Apples (1kg)",
        description:
          "Crisp and sweet organic apples, perfect for snacking or baking.\n\nOur apples are grown using sustainable farming practices without synthetic pesticides. They are hand-picked at the peak of ripeness.",
        price: 4.99,
        originalPrice: 5.99,
        images: [
          "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?w=800&auto=format&fit=crop",
        ],
        category: "fruits",
        brand: "Nature's Basket",
        stock: 80,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: false,
        averageRating: 4.7,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "These apples are so crisp and sweet!",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.5,
            review: "Excellent quality apples.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Bananas (1kg)",
        description:
          "Sweet and nutritious organic bananas.\n\nOur bananas are grown using sustainable farming practices and are free from synthetic pesticides and fertilizers. They are rich in potassium and fiber.",
        price: 3.49,
        originalPrice: 3.99,
        images: [
          "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&auto=format&fit=crop",
        ],
        category: "fruits",
        brand: "Green Harvest",
        stock: 90,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: false,
        isNew: true,
        averageRating: 4.3,
        ratings: [
          {
            user: adminUser._id,
            rating: 4,
            review: "Good quality bananas, not too ripe.",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.5,
            review: "Fresh and sweet.",
            date: new Date(),
          },
        ],
      },

      // Oils
      {
        name: "Cold Pressed Olive Oil (500ml)",
        description:
          "Premium cold-pressed extra virgin olive oil.\n\nOur olive oil is extracted from organically grown olives using traditional cold-pressing methods to preserve its natural flavor and nutritional benefits. Perfect for salads, cooking, and dipping.",
        price: 12.99,
        originalPrice: 14.99,
        images: [
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop",
        ],
        category: "oils",
        brand: "Pure Earth",
        stock: 50,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: false,
        averageRating: 4.9,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "Excellent quality olive oil with a rich flavor.",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.8,
            review: "One of the best olive oils I've tried.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Coconut Oil (500ml)",
        description:
          "Pure organic virgin coconut oil for cooking and skincare.\n\nOur coconut oil is cold-pressed from fresh, organic coconuts without any chemical processing. It's versatile for cooking, baking, and as a natural moisturizer.",
        price: 9.99,
        originalPrice: 11.99,
        images: [
          "https://images.unsplash.com/photo-1611171711791-b34fa42e9fc3?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1575386167795-6c0c8eefa5c5?w=800&auto=format&fit=crop",
        ],
        category: "oils",
        brand: "Wholesome Foods",
        stock: 40,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: false,
        isNew: true,
        averageRating: 4.6,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "Great quality coconut oil, very versatile.",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.2,
            review: "Good for both cooking and skincare.",
            date: new Date(),
          },
        ],
      },

      // Dry Fruits
      {
        name: "Organic Almonds (250g)",
        description:
          "Premium organic almonds, raw and unsalted.\n\nOur almonds are grown using sustainable farming practices without synthetic pesticides. They are rich in protein, fiber, and healthy fats.",
        price: 7.99,
        originalPrice: 9.99,
        images: [
          "https://images.unsplash.com/photo-1574570039896-36186a443cac?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=800&auto=format&fit=crop",
        ],
        category: "dry-fruits",
        brand: "Nature's Basket",
        stock: 60,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: false,
        averageRating: 4.7,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "Fresh and crunchy almonds!",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.5,
            review: "Great quality and taste.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Raisins (500g)",
        description:
          "Sweet and juicy organic raisins, perfect for snacking and baking.\n\nOur raisins are sun-dried from organically grown grapes without any added preservatives or sulfites. They are naturally sweet and packed with antioxidants.",
        price: 5.99,
        originalPrice: 6.99,
        images: [
          "https://images.unsplash.com/photo-1596359900104-a5f5d797d58e?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1596359900104-a5f5d797d58e?w=800&auto=format&fit=crop",
        ],
        category: "dry-fruits",
        brand: "Organic Valley",
        stock: 70,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: false,
        isNew: true,
        averageRating: 4.5,
        ratings: [
          {
            user: adminUser._id,
            rating: 4.5,
            review: "Plump and juicy raisins, great for baking.",
            date: new Date(),
          },
        ],
      },

      // Juices
      {
        name: "Organic Orange Juice (1L)",
        description:
          "Freshly squeezed organic orange juice without added sugar or preservatives.\n\nOur orange juice is made from organically grown oranges, freshly squeezed to preserve maximum flavor and nutrients. It's rich in vitamin C and antioxidants.",
        price: 6.99,
        originalPrice: 7.99,
        images: [
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop",
        ],
        category: "juices",
        brand: "Pure Earth",
        stock: 30,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: true,
        isNew: false,
        averageRating: 4.8,
        ratings: [
          {
            user: adminUser._id,
            rating: 5,
            review: "Tastes like freshly squeezed oranges!",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.5,
            review: "Delicious and refreshing.",
            date: new Date(),
          },
        ],
      },
      {
        name: "Organic Apple Juice (1L)",
        description:
          "Pure organic apple juice with no added sugar or preservatives.\n\nOur apple juice is pressed from organically grown apples and bottled without any additives. It's naturally sweet and rich in antioxidants.",
        price: 5.99,
        originalPrice: 6.99,
        images: [
          "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?w=800&auto=format&fit=crop",
        ],
        category: "juices",
        brand: "Wholesome Foods",
        stock: 35,
        seller: sellerUser._id,
        isActive: true,
        isFeatured: false,
        isNew: true,
        averageRating: 4.6,
        ratings: [
          {
            user: adminUser._id,
            rating: 4.5,
            review: "Great tasting apple juice, not too sweet.",
            date: new Date(),
          },
          {
            user: sellerUser._id,
            rating: 4.7,
            review: "My kids love this juice!",
            date: new Date(),
          },
        ],
      },
    ]

    await Product.insertMany(products)
    console.log("Products seeded successfully")

    // Seed banners
    const banners = [
      // Hero Slides
      {
        title: "Fresh Organic Vegetables",
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1200&auto=format&fit=crop",
        description: "Directly from farms to your table",
        link: "/products/vegetables",
        type: "hero",
        order: 1,
        isActive: true,
      },
      {
        title: "Premium Organic Oils",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&auto=format&fit=crop",
        description: "Cold-pressed for maximum nutrition",
        link: "/products/oils",
        type: "hero",
        order: 2,
        isActive: true,
      },
      {
        title: "Seasonal Organic Fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=1200&auto=format&fit=crop",
        description: "Nature's sweetness in every bite",
        link: "/products/fruits",
        type: "hero",
        order: 3,
        isActive: true,
      },

      // Ad Banners
      {
        title: "Special Offer on Dry Fruits",
        image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=1200&auto=format&fit=crop",
        description: "Get 20% off on all dry fruits",
        link: "/products/dry-fruits",
        type: "ad",
        order: 1,
        isActive: true,
      },
      {
        title: "New Arrivals: Fresh Juices",
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1200&auto=format&fit=crop",
        description: "Try our new range of organic juices",
        link: "/products/juices",
        type: "ad",
        order: 2,
        isActive: true,
      },
      {
        title: "Organic Gift Hampers",
        image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=1200&auto=format&fit=crop",
        description: "Perfect gifts for your loved ones",
        link: "/gift-hampers",
        type: "ad",
        order: 3,
        isActive: true,
      },
    ]

    await Banner.insertMany(banners)
    console.log("Banners seeded successfully")

    // Seed ebooks
    const ebooks = [
      {
        title: "Organic Cooking Basics",
        slug: "organic-cooking-basics",
        image: "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?w=800&auto=format&fit=crop",
        description: "Learn the fundamentals of cooking with organic ingredients to maximize flavor and nutrition.",
        content:
          "# Organic Cooking Basics\n\n## Introduction\n\nCooking with organic ingredients not only benefits your health but also enhances the flavor of your dishes. This guide will help you understand the basics of organic cooking.\n\n## Chapter 1: Understanding Organic Ingredients\n\nOrganic ingredients are grown without synthetic pesticides, fertilizers, or GMOs. They are better for your health and the environment.\n\n## Chapter 2: Essential Cooking Techniques\n\nLearn how to preserve the nutrients in organic ingredients through proper cooking techniques.\n\n## Chapter 3: Simple Organic Recipes\n\nStart your organic cooking journey with these simple and delicious recipes.",
        isActive: true,
      },
      {
        title: "Organic Gardening for Beginners",
        slug: "organic-gardening-beginners",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop",
        description: "Start your own organic garden with this comprehensive guide for beginners.",
        content:
          "# Organic Gardening for Beginners\n\n## Introduction\n\nGrowing your own organic vegetables and fruits is rewarding and ensures you have access to fresh, pesticide-free produce.\n\n## Chapter 1: Planning Your Garden\n\nLearn how to choose the right location, soil, and plants for your organic garden.\n\n## Chapter 2: Natural Pest Control\n\nDiscover effective methods to control pests without using harmful chemicals.\n\n## Chapter 3: Composting Basics\n\nLearn how to create nutrient-rich compost for your garden using kitchen scraps and yard waste.",
        isActive: true,
      },
      {
        title: "Nutritional Benefits of Organic Foods",
        slug: "nutritional-benefits-organic-foods",
        image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop",
        description:
          "Discover the science behind the nutritional advantages of choosing organic over conventional foods.",
        content:
          "# Nutritional Benefits of Organic Foods\n\n## Introduction\n\nOrganic foods often contain higher levels of certain nutrients and fewer pesticide residues compared to conventional foods.\n\n## Chapter 1: Nutrient Density\n\nLearn about the research showing higher levels of antioxidants and essential nutrients in organic produce.\n\n## Chapter 2: Reduced Exposure to Pesticides\n\nUnderstand the health implications of consuming foods with pesticide residues versus organic alternatives.\n\n## Chapter 3: Environmental Impact\n\nDiscover how choosing organic foods benefits not just your health but also the environment.",
        isActive: true,
      },
      {
        title: "Organic Skincare Recipes",
        slug: "organic-skincare-recipes",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
        description: "Create your own natural skincare products using organic ingredients from your kitchen.",
        content:
          "# Organic Skincare Recipes\n\n## Introduction\n\nMany organic food ingredients can be used to create effective and natural skincare products without harmful chemicals.\n\n## Chapter 1: Understanding Your Skin\n\nLearn about different skin types and how to choose the right ingredients for your specific needs.\n\n## Chapter 2: Basic Ingredients\n\nDiscover common kitchen ingredients that have amazing skincare benefits.\n\n## Chapter 3: DIY Recipes\n\nStep-by-step instructions for creating facial masks, scrubs, moisturizers, and more using organic ingredients.",
        isActive: true,
      },
      {
        title: "Sustainable Living with Organic Products",
        slug: "sustainable-living-organic",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
        description:
          "A comprehensive guide to incorporating organic products into your lifestyle for a more sustainable future.",
        content:
          "# Sustainable Living with Organic Products\n\n## Introduction\n\nAdopting an organic lifestyle goes beyond food choices and can impact every aspect of your daily life.\n\n## Chapter 1: Beyond Organic Food\n\nExplore organic options for clothing, household products, and personal care items.\n\n## Chapter 2: Reducing Waste\n\nLearn practical tips for minimizing waste and living more sustainably with organic products.\n\n## Chapter 3: Building a Sustainable Community\n\nDiscover how to connect with like-minded individuals and support local organic initiatives.",
        isActive: true,
      },
    ]

    await Ebook.insertMany(ebooks)
    console.log("Ebooks seeded successfully")

    console.log("All data seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()
