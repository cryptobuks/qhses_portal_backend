const http = require("http");
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || process.env.SERVER_PORT;;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server litening on port ${port}`);
});
