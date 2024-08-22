import mongoose from "mongoose";

const dataBaseConfig = () => {
  try {
    mongoose.connect(process.env.MONGO_URI!, { dbName: "node_auth" });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("error in database connection", err);
  }
};

export default dataBaseConfig;
