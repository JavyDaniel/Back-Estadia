import app from "./app.js";
import { PORT} from "./config.js";
import { _connect } from "./database.js";
import { server } from "./app.js";
_connect();
server.listen(PORT || 3000);
console.log("Server on port", PORT);
