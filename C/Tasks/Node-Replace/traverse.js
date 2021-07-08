//尝试遍历某一目录下的所有文件

var fs = require('fs');
var path = require('path');

//解析需要遍历的文件夹，以E盘根目录为例
var filePath = __dirname;

//调用文件遍历方法
fileDisplay(filePath);

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (err, stats) {
          if (err) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile();//是文件
            var isDir = stats.isDirectory();//是文件夹
            if (isFile) {
              let type = filename.split('.');
              let realType = '.' + type[type.length - 1];

              // if(realType.endsWith('.js') !== true) {
              //   console.log(filename);
              // }

              if(realType.endsWith('.js') !== true) {
                fs.readFile(filedir, (err, data) => {
                  if (err) {
                    throw err;
                  }
                  console.log(data.toString());
                })
              }
            }
            if (isDir) {
              fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      });
    }
  });
}