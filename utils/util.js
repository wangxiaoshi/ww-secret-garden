const formatTime = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeWithoutSecond = date => {
  var date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

/**
 * 获取指定FileID的文件，并且返回该文件的临时路径
 * @param {*} fileID 需要下载的文件ID
 */
const getFile = fileID => {
  wx.cloud.downloadFile({
    fileID: fileID, // 文件 ID
  }).then(function (res) {
    console.log(res.tempFilePath)
    // return res.tempFilePath
  })
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeWithoutSecond: formatTimeWithoutSecond,
  getFile: getFile,
}
