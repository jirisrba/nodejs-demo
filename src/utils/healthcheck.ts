import { request } from 'http';

const port: number = parseInt(process.env.PORT) || 3000

const liveness_path: string = process.env.LIVENESS_URL || "/status";


const req = request(
  {
    host: "localhost",
    port: port,
    path: liveness_path,
    method: "GET",
  },
  (response) => {
    if (response.statusCode != 200) {
      return process.exit(1);
    }
  }
);

req.end();
