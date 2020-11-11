import { Logger } from "tslog";

import { config } from "../../config"

export const log: Logger = new Logger({
  type: config.log_type
});
