// 将目录渲染至页面

const fs = require('fs');
const path = require('path');

// 将整个函数导出
exports.formPage = (targetPath) => {
  let files = fs.readdirSync(targetPath); // 获取该目录下所有文件名

  urls = files
  .map((f) => path.join(targetPath, f))
  .map((path) => path.replace("\\", "/"));

  console.log(urls);

  let htmls = new Array; // 声明空数组，存放目录下的子目录/文件，再插入html字符串中

  for (let i = 0; i < urls.length; i++) {
    htmls.push(`<li><a href="${urls[i]}">${files[i]}</a></li>`);
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
      <title>Document</title>
    </head>
    <body>
      <h1>Index Of ${targetPath}</h1>
      <ul>
        ${htmls.join("\n")}
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