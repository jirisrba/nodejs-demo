import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(parseInt(process.env.PORT) || 3000);
