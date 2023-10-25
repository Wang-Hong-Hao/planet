### echarts自定义平均线样式



> 自定义平均线样式

效果：
![](https://img2020.cnblogs.com/blog/2483371/202109/2483371-20210917145636891-912309203.png)








代码：

```js
series: [
          {
            name: val,
            type: 'bar',
            barWidth: 40,//柱子宽度
            label: {
              show: true
            },
            data: this.sortData(val),
            markLine: {
              
              symbol: 'none',//取消开始结束标记（不显示箭头）
              data: [
                { //支持 average，min，max
                  type: 'average',
                  name: '平均值',
                  label:{  //自定义显示标签
                    normal: {
                      color:'#000',
                      formatter: function(params) {
                        return '平均值' + params.value
                      },
                    }
                  },
                  lineStyle: {
                    normal: {
                      color: '#d87d40',
                      width: 2,
                      type: 'solid'
                    }
                  }
                },
              ]
            },
          }
        ]
```
