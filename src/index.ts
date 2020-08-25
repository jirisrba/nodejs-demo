import { app } from "./app";
import { AddressInfo } from "net";
import "./config";

const PORT: number = parseInt(process.env.PORT) || 3000;

const server = app.listen(Number(PORT), "0.0.0.0", () => {
  const { port, address } = server.address() as AddressInfo;
  console.log("Server listening on:", "http://" + address + ":" + port);
});
