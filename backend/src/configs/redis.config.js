import { createClient } from "redis";

// export const Redis = createClient({ url: process.env.REDIS_URL });
export const Redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    connectTimeout: 10000,
    commandTimeout: 8000,
  },
});
let isConnected = false;

export const connectRedis = async () => {
  try {
    if (!isConnected) {
      await Redis.connect();
      isConnected = true;
      console.log("Redis connected");
    }
  } catch (err) {
    console.log("Error connecting redis", err);
    process.exit(1);
  }
};
