import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    const REQUIRED_ENV = ["NODE_ENV", "PORT", "HOST", "MONGO_URL", "DB_NAME"];

    const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
    if (missingEnv.length > 0) {
      console.log("Missing Required ENV Varibles", missingEnv.join(","));
      process.exit(1);
    }
  } catch (err) {
    console.error("Error loading environment variables:", err.message);
    process.exit(1);
  }
})();
