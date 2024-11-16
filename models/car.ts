import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
  title: string;
  description: string;
  images: string[];
  tags: {
    car_type: string;
    company: string;
    dealer: string;
    [key: string]: string;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  tags: {
    car_type: { type: String, required: true },
    company: { type: String, required: true },
    dealer: { type: String, required: true }
  },
  userId: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema); 