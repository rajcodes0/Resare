import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, { keepOnFail = true } = {}) => {
  if (!localFilePath) return null;
  
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    
    // ✅ Use synchronous unlink since you imported regular fs
    fs.unlinkSync(localFilePath);
    
    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    if (!keepOnFail) {
      try {
        // ✅ Use synchronous unlink here too
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
        }
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }
    throw error;
  }
};

export { uploadOnCloudinary };