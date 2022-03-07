import { createLogger, transports } from 'winston';

const { Console } = transports;
const { ElasticsearchTransport } = require('winston-elasticsearch');

import { config } from "../../config"

const esTransportOpts = {
  level: process.env.LOG_LEVEL || 'info',
  index: `scenarios-${(process.env.NODE_ENV === 'production') ? 'prod' : 'stage'}`,
  dataStream: true,
  clientOpts: {
      node: process.env.ES_HOST,
      auth: {
        apiKey: process.env.ES_API_KEY
      }
  }
};
const esTransport = new ElasticsearchTransport(esTransportOpts);

const winstonLogger = createLogger({
  transports: [
    esTransport
  ]
});

winstonLogger.add(new Console);
winstonLogger.add(esTransport);

winstonLogger.info('Logger to elastic initialized');
winstonLogger.info(`scenarios-${(process.env.NODE_ENV === 'production') ? 'prod' : 'stage'}`);
export const logger = winstonLogger;
