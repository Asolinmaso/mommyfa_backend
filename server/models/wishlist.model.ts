import { mongoose } from '../db';
import { Schema, Document } from 'mongoose';

// Wishlist interface
export interface IWishlist extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}

// Wishlist schema
const wishlistSchema = new Schema<IWishlist>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate wishlist entries
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

// Create and export the Wishlist model
export const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);