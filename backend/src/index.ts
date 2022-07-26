import Server from "./Server";
import "reflect-metadata";
import 'backend/src/index-style.ts';

const server = new Server();
(async () => {
  await server.start();
})();
