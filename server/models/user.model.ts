import { mongoose } from '../config/mongodb';
import { Schema, Document } from 'mongoose';

// User roles type
export type UserRole = 'admin' | 'seller' | 'buyer';

// User interface
export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: UserRole;
  createdAt: Date;
}

// User schema
const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true,
    unique: true 
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'seller', 'buyer'],
    default: 'buyer' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export the User model
export const User = mongoose.model<IUser>('User', userSchema);