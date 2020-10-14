import { request } from 'http';

const req = request(
  {
    host: 'localhost',
    method: 'GET',
    path: process.env.LIVENESS_PATH || '/health',
    port: Number(process.env.PORT as string) || 3000,
  },
  (response) => {
    if (response.statusCode !== 200) {
      throw new Error('Healthcheck failed.');
    }
  },
);

req.end();
