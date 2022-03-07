import dotenv from "dotenv";
import { ISettingsParam } from "tslog";

// load .env
dotenv.config();

//   type?: "json" | "pretty" | "hidden"
const logFormat = <ISettingsParam["type"]> (process.env.LOG_TYPE || "json");

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  log_type: logFormat,
};
