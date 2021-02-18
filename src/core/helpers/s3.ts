import { S3 } from "aws-sdk";

import { config } from "../../config";
import { log } from ".";

// Create S3 service object
const s3 = new S3({
  accessKeyId: config.s3_access_key_id,
  endpoint: config.s3_endpoint,
  secretAccessKey: config.s3_secret_access_key,
  signatureVersion: "v4",
});

export const listMyBuckets = (): void => {
  s3.listBuckets(function(err, data) {
    if (err) {
    } else {
      log.info("My buckets now are:\n");

      for (let i = 0; i < data.Buckets.length; i++) {
        log.info(data.Buckets[i].Name);
      }
    }
  });
}
