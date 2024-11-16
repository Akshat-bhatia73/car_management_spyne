interface MongooseConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  }
  
  declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseConnection | undefined;
  }
  
  import mongoose from 'mongoose';
  
  const MONGODB_URI = process.env.MONGODB_URI!;
  
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  // Create a type-safe initial cache value
  const initialCache: MongooseConnection = { conn: null, promise: null };
  
  // Use type assertion with unknown as an intermediate step
  const cached: MongooseConnection = 
    (global.mongoose as MongooseConnection | undefined) ?? initialCache;
  
  if (!global.mongoose) {
    global.mongoose = cached;
  }
  
  async function connectDB() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI);
    }
    
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (error) {
      cached.promise = null;
      throw error;
    }
  }
  
  export default connectDB;