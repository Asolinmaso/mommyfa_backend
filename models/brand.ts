import mongoose from "mongoose"

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a brand name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide a brand slug"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Please provide a brand image"],
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Brand || mongoose.model("Brand", BrandSchema)
