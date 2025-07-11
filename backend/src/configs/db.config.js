import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connc = await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });

    console.log("Databse connected " + connc.connection.host);
  } catch (err) {
    console.log("Error connecting database" + err.message);
    process.exit(1)
  }
};
