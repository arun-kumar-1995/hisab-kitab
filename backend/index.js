// load env required files
import "./src/configs/env.config.js";
import app from "./src/app.js";

import { connectDB } from "./src/configs/db.config.js";
import { connectRedis } from "./src/configs/redis.config.js";

process.on("unhandledException", (err) => {
  console.log("Unhandled Exception occour", err);
  process.exit(1);
});

const port = parseInt(process.env.PORT, 10);

const startServer = async () => {
  try {
    // connect to database
    await connectDB();

    // connect to redis
    await connectRedis();

    // listen for server
    app.listen(port, () => {
      console.log(`Server started : ${process.env.HOST}:${port}`);
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
};

startServer();
