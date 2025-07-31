import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb connected successfully...😃"))
    .catch((err) => console.log("Failed to connevt the mongodb...😥", err));
};

export default db;
