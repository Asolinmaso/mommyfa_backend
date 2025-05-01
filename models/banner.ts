import mongoose from "mongoose"

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a banner title"],
    },
    image: {
      type: String,
      required: [true, "Please provide a banner image"],
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: [true, "Please provide a banner link"],
    },
    type: {
      type: String,
      enum: ["hero", "ad"],
      required: [true, "Please specify banner type"],
    },
    order: {
      type: Number,
      default: 0,
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

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema)
