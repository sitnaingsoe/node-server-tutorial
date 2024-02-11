import http, {IncomingMessage, ServerResponse} from "http";
import fs from "fs";
import {Menu} from "./types";
const menus: Menu[] = [];
const PORT = 2000;
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    const data = fs.readFileSync("index.html");
    res.write(data);
    res.end();
  } else if (url === "/style.css") {
    const data = fs.readFileSync("style.css");
    res.writeHead(200, "OK", {"content-type": "text/css"});
    res.write(data);
    res.end();
  } else if (url === "/script.js") {
    const data = fs.readFileSync("script.js");
    res.writeHead(200, "OK", {"content-type": "text/javascript"});
    res.write(data);
    res.end();
  } else if (url === "/menu") {
    switch (method) {
      case "GET":
        res.write(JSON.stringify(menus));
        res.end();
        break;
      case "POST":
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => {
          const menu = JSON.parse(data);
          menus.push(menu);
          console.log(data);
          console.log(menus);
          res.write(JSON.stringify(menus));
          res.end();
        });
        break;
    }
  }
});

server.listen(PORT, () => console.log(`Server is listen on ${PORT}`));
