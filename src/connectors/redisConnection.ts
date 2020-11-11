import Redis from "ioredis";

import { config } from "../config";

const redis = new Redis({
  port: config.redis_port,
  host: config.redis_host
});

export { redis };
