import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true }
  },
  businessDetails: {
    businessName: { type: String, required: true },
    address: { type: String, required: true },
    gstNumber: { type: String },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
});

const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;