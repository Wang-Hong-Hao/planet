### echarts自定义tooltip提示框

> 系列名
>
> 数据名 + ':' + 数据值 + '单位'


<br>


```js
 tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var relVal = params[0].name
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + ' % '
            }
            return relVal
          }
        },
```

<br>

> 数据值为空或者0的不显示（只显示有值的）


<br>

```js
 tooltip: {
          trigger: "axis",
          formatter: function (params) {
            //x轴的名称
            var htmlStr = params[0].name + '<br/>'
            for (var i = 0; i < params.length; i++) {
              var param = params[i]
              if (param.value > 0) {
                htmlStr += '<div>'
                //为了保证和原来的效果一样，复制的是：param.marker的源码，圆点样式：param.color
                htmlStr += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + 						param.color + ';"></span>'
                // 名称颜色设置
                // htmlStr += '<span style="color:'+param.color+'">';
                //圆点后面显示的名称
                htmlStr += param.seriesName + ':' + param.value + '%'
                // htmlStr += '</span>';
                htmlStr += '</div>'
              }
            }
            return htmlStr
          }

        },
```
