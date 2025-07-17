import { v2 as cloudinary } from "cloudinary";
import { SECRET_KEY } from "../constants/secret_keys.constants.js";

cloudinary.config({
  cloud_name: SECRET_KEY.CLOUD_NAME,
  api_key: SECRET_KEY.CLOUDINARY_API_KEY,
  api_secret: SECRET_KEY.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
