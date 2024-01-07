import mongoose, { Mongoose } from "mongoose";

const URI: string | undefined = process.env.MONGODB_URI;

if (!URI || typeof URI !== "string") {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/*
 * Connection options:
 * @returns {Promise<mongoose.Mongoose>} Mongoose instance
 * @throws {Error} if connection fails
 */

async function ConnectToMongoDb(): Promise<Mongoose> {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }
    const options = { bufferCommands: false };

    // Connect to MongoDB
    await mongoose.connect(URI, options);
    console.log("MongoDB connected");

    return mongoose;
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw new Error("MongoDB connection failed");
  }
}

export default ConnectToMongoDb;
