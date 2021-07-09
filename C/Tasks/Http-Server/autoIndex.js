// 将目录渲染至页面

const fs = require('fs');
const path = require('path');
const { config } = require('./server');    
//如果不套大括号，输出config的结果为：{config: { port: '8080', addr: '127.0.0.1', showList: true, autoIndex: true }}

// 将整个函数导出
exports.autoIndex = (targetPath) => {
  let files = fs.readdirSync(targetPath); // 获取该目录下所有文件名

  urls = files
  .map((filePath) => path.join(targetPath, filePath))
  .map((path) => path.replace("\\", "/"));
  
  if (config.showList) {
    console.log(urls.join('\n'));
  }

  let items = new Array; // 声明空数组，存放目录下的子目录/文件，再插入html字符串中

  for (let i = 0; i < urls.length; i++) {
    items.push(`<li><a href="${urls[i]}">${files[i]}</a></li>`);
  }

  // 将这些内容返回，server拿到该字符串后，将会res.end()显示在屏幕上
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <title>Http-Server</title>
    </head>
    <body>
      <h1>Index Of ${targetPath}</h1>
      <ul>
        ${items.join("\n")}
      </ul>
    </body>
    <style>
      h1 {
        margin: 20px 0 20px 5px;
      }
      ul {
        list-style: none;
      }
      li {
        padding: 5px 0 0 10px;
      }
    </style>
  </html>
  `;
};