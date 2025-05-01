import mongoose from "mongoose"

const EbookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an ebook title"],
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please provide an ebook slug"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an ebook cover image"],
    },
    description: {
      type: String,
      required: [true, "Please provide an ebook description"],
    },
    content: {
      type: String,
      required: [true, "Please provide ebook content"],
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

export default mongoose.models.Ebook || mongoose.model("Ebook", EbookSchema)
