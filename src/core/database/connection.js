import mongoose from "mongoose";
import { database_urls } from "../common/constant.js";
import "dotenv/config";
import { User } from "../../models/user.js";

const connectDB = async () => {
  try {
    (async function () {
      const dbUri = database_urls.connection + database_urls.db_name;
      await mongoose.connect(dbUri, {
      });
      let admin = await User.findOne({
        email: 'admin@gmail.com'
      })

      if (!admin) {
        const adminSchema = new User({
          fullname: 'Admin',
          email: 'admin@gmail.com',
          password: "1234"
        })

        await adminSchema.save()
        console.log("admin created sucessufully")
      }


      let user = await User.findOne({
        email: 'abc@gmail.com'
      })



      if (!user) {
        const userSchema = new User({
          fullname: 'User',
          email: 'abc@gmail.com',
          password: "1234"
        })

        await userSchema.save()

      }
    })();
  } catch (error) {
    console.error("database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
