import dotenv from "dotenv";
import { ISettingsParam } from "tslog";

// load .env
dotenv.config();


//   type?: "json" | "pretty" | "hidden"
const logFormat = <ISettingsParam["type"]> (process.env.LOG_TYPE || "json");

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  redis_host: process.env.REDIS_HOST || '127.0.0.1',
  redis_port: Number(process.env.REDIS_PORT) || 6379,
  log_type: logFormat,
};
