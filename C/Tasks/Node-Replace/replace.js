const fs = require('fs');
const path = require('path');

// let src = 'xyl的作业'
let src = __dirname;

// let str1 = 'cym'; // 原字符串
// let str2 = 'xyl'; // 新字符串
let str1 = 'xyl';    // 原字符串
let str2 = 'cym';    // 新字符串

let reg = new RegExp(str1, 'g');

// 修改版本
function replaceName(fileName) {
  return new Promise((resolve, reject) => {
    let oldPath = fileName;
    let newPath = oldPath.replace(reg, str2);

    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        throw err;
      }
      else {
        console.log('替换成功');
        resolve(newPath); 
        // 此处的resolve写在里面，确保rename操作结束
      }
    });
  })
}

fileDisplay(src);

function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      files.forEach(function (filename) {
        let filedir = path.join(filePath, filename);
        // console.log(filedir);

        fs.stat(filedir, function (err, stats) {
          if (err) {
            console.warn(filedir + '：获取文件stats失败');
          } else {
            let isFile = stats.isFile();
            let isDir = stats.isDirectory();
            if (isFile) {
              let type = filename.split('.');
              let realType = '.' + type[type.length - 1]; // 获得文件拓展名

              if (!realType.endsWith('.js')) {
                fs.readFile(filedir, (err, data) => {
                  if (err) {
                    throw err;
                  }

                  // 修改文件内容
                  data = data.toString();
                  newData = data.replace(reg, str2);
                  fs.writeFileSync(filedir, newData, (err) => { 
                    // 此处使用同步，可以阻塞下方代码，确保先修改文件内容，再修改文件名
                    // 也可以使用Promise
                    
                    if (err) {
                      throw err;
                    }
                    else {
                      console.log('文件内容修改成功');
                    }
                  })
                  // 修改文件名（和上方的操作不可颠倒）
                  replaceName(filedir);
                })
              }
            }
            if (isDir) {
              replaceName(filedir).then((newdir) => {
                fileDisplay(newdir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
              });
            }
          }
        })
      });
    }
  });
}