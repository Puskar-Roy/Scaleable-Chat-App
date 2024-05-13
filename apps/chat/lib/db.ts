import { Redis } from "@upstash/redis";
import { config } from "@/config/config";

export const db = new Redis({
  url: config.REDIS_URL,
  token: config.REDIS_TOKEN,
});
