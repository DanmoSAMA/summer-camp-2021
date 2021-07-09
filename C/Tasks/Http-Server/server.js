// cli、创建服务器

const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

const { autoIndex } = require('./autoIndex');
const { getTime } = require('./getTime');
const { help } = require('./help');

const config = {
  port: "8080",
  addr: "127.0.0.1",
  // showList: true,
  autoIndex: true
}

let argIndex = new Array;
let args = process.argv.slice(2); // 前两个元素是路径，从数组第三个元素开始取，获得命令行参数等信息

args.forEach((item, index) => {
  if (item[0] === "-") {          // 如果某个命令是以"-"开始的，把序号加入数组
    argIndex.push(index);
  }
})

argIndex.forEach((index) => {     // forEach的第一个参数是item，但argIndex数组中存的都是数组内的标号，所以item成为了index
  try {
    switch (args[index]) {
      case "-p":
      case "--port":
        config.port = args[index + 1];
        return;
      case "-a":
        config.addr = args[index + 1];
        return;
      // case "-d":
      //   config.showList = false;
      //   return;
      case "-i":
        config.autoIndex = false;
        return;
      case "-h":
        console.log(help);
        process.exit(0);         // 仅显示help信息，不会启动服务器
    }
  } catch { }
  console.error("unkown command:", args[index]);
  process.exit(-1);
});

const server = http.createServer((req, res) => {
  console.log(getTime(), "\t", req.method, req.url);

  let urlPath = url.parse(req.url).pathname; // 获得url的末尾字段
  let targetPath = path.join("./", urlPath); // 拼接路径，/末尾字段
  let absPath = path.resolve(targetPath);    // 把一个路径或路径片段的序列解析为一个绝对路径

  // 按照当前路径，去找对应的目录/文件
  fs.stat(absPath, (err, stats) => {         // stat的第一个参数可以是absPath，也可以是targetPath
    if (err || !stats) {
      console.log("file at:", absPath, "is not found");
      res.writeHead(404);                    // 向请求的客户端发送响应头
      res.end("404 Not Found!");
      return;

    } else if (stats.isDirectory && stats.isDirectory()) {
      // 暂未理解 -i 选项的含义
      // 姑且理解为：若加上-i，当某一目录下有index.html或index.htm时，不显示目录而直接显示html中的内容
      // 若不带-i，则显示目录的内容
      
      if (config.autoIndex) {
        res.writeHead(200);
        res.end(autoIndex(targetPath));
        return;
      }

      let tryFiles = ["index.html", "index.htm"].map((item) =>
        path.join(targetPath, item)
      );

      tryFiles.forEach((path) => {
        try {
          data = fs.readFileSync(path);      // 依次尝试在该目录下找index.html和index.htm
          if (data) {
            res.writeHead(200);              // 如果找到了，不显示目录而直接显示html内容
            res.end(data);
            return;
          }
          else {
            res.end(autoIndex(targetPath));  // 目录的情况，将处理后的字符串显示在页面上
            return;
          }
        }
        catch (err) {
          // console.log('未找到index.html或index.htm文件！');
          res.end(autoIndex(targetPath));
        }
      })

    } else if (stats.isFile && stats.isFile()) {
      fs.readFile(targetPath, (err, file) => {
        if (err) throw err;
        if (!urlPath.endsWith('jpg') && !urlPath.endsWith('png') && !urlPath.endsWith('gif')) {
          if (urlPath.endsWith('html') || urlPath.endsWith('htm')) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });  // html文件特殊处理
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' }); // 防止文本出现中文乱码
          }
        } else {
          res.writeHead(200);
        }
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
  process.exit(-1);
}

console.log('\033[33m Starting up http-server, serving \033' + '\033[34m ./\033');
console.log('\033[33m Available on:\033');
console.log('\033[37m   http://\033' + config.addr + ':' + '\033[32m' + config.port + '\033');
console.log('\033[37m Hit CTRL-C to stop the server \033');

// console.log(`
//   Starting up http-server, serving ./
//   Available on:
//     http://${config.addr}:${config.port} 
//   Hit CTRL-C to stop the server`
// )

// exports.config = config;
