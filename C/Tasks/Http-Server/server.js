// 模块引入、创建服务器
const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
const { formPage } = require('./formPage');  // 必须套大括号

const config = {
  port: "8080",
  addr: "0.0.0.0"
}

const server = http.createServer((req, res) => {
  let urlPath = url.parse(req.url).pathname; // 获得url的末尾字段
  // console.log(urlPath);
  let targetPath = path.join("./", urlPath); // 拼接路径，/末尾字段
  // console.log(targetPath);
  let absPath = path.resolve(targetPath);    // 把一个路径或路径片段的序列解析为一个绝对路径
  // console.log(absPath);

  // 按照当前路径，去找对应的目录/文件
  fs.stat(absPath, (err, stats) => {         // stat的第一个参数必须是绝对路径吗？
    if (err || !stats) {
      console.log("file at:", absPath, "is not found");
      res.writeHead(404);                    // 向请求的客户端发送响应头
      res.end("404 Not Found!");
      return;

    } else if (stats.isDirectory && stats.isDirectory()) {
      res.end(formPage(targetPath));         // 目录的情况，将处理后的字符串显示在页面上

    } else if (stats.isFile && stats.isFile()) {
      fs.readFile(targetPath, (err, file) => {
        if (!urlPath.endsWith('jpg') && !urlPath.endsWith('png') && !urlPath.endsWith('gif')) {
          res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'}); // 防止文本出现中文乱码

        } else if (urlPath.endsWith('html') || urlPath.endsWith('html')) {
          res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});  // 设置了为什么无效？

        } else res.writeHead(200);
        res.end(file);  // 将文件内容显示在页面上
      })
    }
  })

})

try {
  server.listen(config.port, config.addr);
}
catch (err) {
  console.error(err);
}

console.log(`Server running at http://localhost:${config.port}/`);