const fs = require('fs');
let src = './xyl的作业'
let str1 = 'xyl';
let str2 = 'cym';

fs.readdir(src, (err, files) => {
  if (err) throw err;
  files.forEach((item, index) => { // 当前元素、当前元素的索引值
    let oldPath = item;
    console.log(oldPath);
    let newPath = oldPath.replace(,str2);
    console.log(newPath);
    fs.rename(oldPath, newPath, function (err) {
      if(err){
        console.log('替换失败');
        }
    });
  })
})