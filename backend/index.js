// load env required files
import "./src/configs/env.config.js";
import app from "./src/app.js";

import { connectDB } from "./src/configs/db.config.js";

process.on("unhandledException", (err) => {
  console.log("Unhandled Exception occour", err);
  process.exit(1);
});

const port = process.env.PORT;

const startServer = async () => {
  try {
    // connect to database
    await connectDB();
    // listen for server
    app.listen(port, () => {
      console.log(`Server started : ${process.env.HOST}:${port}`);
    });
  } catch (err) {
    console.log("Error starting server", err);
  }
};

startServer();
