import dotenv from "dotenv";
import { ISettingsParam } from "tslog";

// load .env
dotenv.config();

//   type?: "json" | "pretty" | "hidden"
const logFormat = <ISettingsParam["type"]> (process.env.LOG_TYPE || "json");

export const config = {
  port: parseInt(process.env.PORT) || 3000,
  s3_access_key_id: process.env.S3_ACCESS_KEY_ID,
  s3_bucket_name: process.env.S3_BUCKET_NAME,
  s3_endpoint: process.env.S3_ENDPOINT,
  s3_secret_access_key: process.env.S3_ENDPOINT,
  log_type: logFormat,
};
