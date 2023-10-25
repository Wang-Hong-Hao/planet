```
export default function imgUrlToBase64 (url, callback, outputFormat) {
  var canvas = document.createElement('CANVAS')
  var ctx = canvas.getContext('2d')
  var img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    canvas.height = img.height
    canvas.width = img.width
    ctx.drawImage(img, 0, 0)
    var dataURL = canvas.toDataURL(outputFormat || 'image/png')
    //回调函数传递转换完成的base64编码
    callback.call(this, dataURL)
    canvas = null
  }
  img.src = url
}

```