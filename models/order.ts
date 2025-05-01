import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: [true, "Please provide quantity"],
        },
        price: {
          type: Number,
          required: [true, "Please provide price"],
        },
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide payment method"],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    subtotal: {
      type: Number,
      required: [true, "Please provide subtotal"],
    },
    tax: {
      type: Number,
      required: [true, "Please provide tax"],
    },
    shippingCost: {
      type: Number,
      required: [true, "Please provide shipping cost"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "Please provide total"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
    trackingNumber: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
