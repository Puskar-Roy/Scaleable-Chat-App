import dotenv from 'dotenv';
dotenv.config();

export const config = {
  HOST: process.env.HOST || "",
  PORT: parseInt(process.env.PORT || "0", 10) || 0,
  USERNAME: process.env.NAME || "",
  PASSWORD: process.env.PASSWORD || "",
};