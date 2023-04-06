const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const path = require("path");

//read env vars
dotenv.config();

//define paths
const paths = {
	src: path.join(__dirname, "src"),
	static: path.join(__dirname, "static")
}

//create app
const app = express();

app.use("/static", express.static(paths.static));
app.use(express.static(__dirname)); //just display static index.html file

//start server
const server = http.createServer(app);
const port = process.env.PORT ?? 8080;
server.listen(port, () => console.log(`\x1b[32mHTTP server started successfully: http://localhost:${port}/\x1b[0m`));