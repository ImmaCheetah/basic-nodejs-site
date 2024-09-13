// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config()
import { createServer } from 'node:http';
// import * as fs from 'fs';
import fs from 'node:fs/promises';
import * as url from 'url';
const hostname = '127.0.0.1';
const port = 8080;

const server = createServer(async function (req, res) {
  let parsedUrl = url.parse(req.url, true)
  let filename = "." + parsedUrl.pathname

  if (filename === './favicon.ico') return

  console.log(parsedUrl.pathname)
  console.log(filename)

  try {
    const data = await fs.readFile(filename)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
    console.log(data)
  } catch (err) {
    const data = await fs.readFile('404.html')
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
    console.log(err)
  }
  // fs.readFile(filename, (err, data) => {
  //   if (err) {
  //     console.log('IF BLOCK', err)
  //     fs.readFile('404.html', (err, data) => {
  //       res.statusCode = 404;
  //       res.setHeader('Content-Type', 'text/html');
  //       res.end(data)
  //     })
  //   } else {
  //     res.statusCode = 200;
  //     res.setHeader('Content-Type', 'text/html');
  //     res.end(data);
  //   }
  // })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});