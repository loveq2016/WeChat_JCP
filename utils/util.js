function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//截取事件 yyyy-MM-dd
function subStr(time){
  var d=time.split('T');
  return d[0];
}

//截取事件 yyyy-MM-dd HH:mm
function replaceStr(time){
  var d=time.replace('T','  ');
  return subHistory(d,".")[0];
}

function subHistory(str,his){
  var d=str.split(his);
  return d;
}



module.exports = {
  formatTime: formatTime,
  subStr:subStr,
  replaceStr:replaceStr,
  subHistory:subHistory
}
