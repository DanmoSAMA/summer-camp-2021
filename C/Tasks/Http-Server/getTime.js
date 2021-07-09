// 获得当前时间

exports.getTime = function () {
  let time = new Date();

  let minutes = time.getMinutes().toString();
  let seconds = time.getSeconds().toString();
  let hours = time.getHours().toString();
  let months = (time.getMonth() + 1).toString();
  let date = time.getDate();
  
  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }
  if (hours.length < 2) {
    hours = "0" + hours;
  }
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }
  return `${months}-${date} ${hours}:${minutes}:${seconds}`;
};