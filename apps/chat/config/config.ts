export const config = {
  REDIS_URL: process.env.UPSTASH_REDIS_REST_URL || "",
  REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
};
