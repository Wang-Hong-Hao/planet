# echarts总结

> 1. echarts 初始化必须指定容器的宽高

> 2. options配置项

 ### 图表grid与canvas的距离

```js
 grid: {
          left: '300px',
          right: '150px',
          bottom: '25px'
        },
```

### 提示框

```js
 tooltip: {
          trigger: "axis",
          formatter: '{b0}<br />{a0} : {c0}%<br/>{a1} : {c1}%<br/>{a2} : {c2}%<br/>{a3} : {c3}%',
        },
```

### x轴竖线的长度

```js
xAxis: {
          show: true,
          data: this.filterRoadName,

          splitLine: {
            show: false,
          },
          axisTick: {
            // show:false,
            length: 25 // 竖线的长度
          }
        },
```

### 柱状图柱子宽度

```js
 series: [
          {
            name: 'Ⅰ级热熔型',
            type: 'bar',
            stack: '使用情况',//相同的stack开启堆叠
            // data: [60, 20, 36, 10, 10, 20],
            data: this.initData('grade1Material1Length'),
            barWidth: 50,//柱子宽度
            barGap: '0%',/*多个并排柱子设置柱子之间的间距*/
            barCategoryGap: '0%',/*多个并排柱子设置柱子之间的间距*/
            itemStyle: {
            	normal: { color: "#00b050" },//柱子颜色
          	},
            itemStyle: {
                 normal: {
                     color: (params) => {
                         return this.initColor(this.sortData(val))[params.dataIndex] //动态颜色
                     }
                 }
            },
          },
        ]
```

### x轴标签旋转

```js
xAxis: {
          type: 'category',
          data: this.filterRoadName,
          axisLabel: {
            rotate: this.rotate,//旋转度数
          }
        },
```



### 丢弃上次配置

```js
myChart.setOption(this.option, true)//第二个参数设置为true丢弃上次的配置 重新渲染
```
```
### 饼图标签居中显示

```js
label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{a|{b}}\n{p|{c}}',
                textStyle: {
                  color: '#727272',
                },
                rich: {
                  p: {
                    align: 'center'
                  }
                }
              },
              emphasis: {
                show: true,
              }
            },
```


```
```
### 平均值线

```js
markLine: {
              symbol: 'none',//取消开始结束标记（不显示箭头）
              data: [
                { //支持 average，min，max
                  type: 'average',
                  name: '平均值',
                  label: {
                    normal: {
                      color: '#dd8146',
                      fontSize: 15,
                      padding: [-13, -40, 15, -90],
                      formatter: function (params) {
                        return '均值' + params.value
                      },
                      // formatter: this.average(val),
                    }
                  },
                  lineStyle: {
                    normal: {
                      color: '#dd8146',
                      width: 2,
                      type: 'solid'
                    }
                  }
                },
              ]
            },
```


```
```
### y轴百分比显示

```js
 yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',//居中显示
            formatter: val === '完整性' ? '{value} %':'{value}',//以百分比显示
          },
          splitLine: {
            show: false,
          },
          max: this.yMax()
        },
```

> 
```
```
### 柱状图不同颜色

```js
   series: [
          {
            name: '标线长度',
            type: 'bar',
            data: this.initCharts2Data('bar'),
            barWidth: 40,//柱子宽度
            itemStyle: {
              normal: {
                color: (params) => {
                  return this.color[params.dataIndex]
                },
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 15,
                  color: '#000'
                }
              },

            },
            label: {
              show: true,
            },
          }
        ]
```


```
```
### 饼图标签和引导线



```js
labelLine:{  
     normal:{  
          length:5,  // 改变标示线的长度
          lineStyle: {
             color: "red"  // 改变标示线的颜色
          }
     },
},
label: {
     normal: {
          textStyle: {
                color: 'red'  // 改变标示文字的颜色
          }
     }

```




```
```


### eharts下载图表

```js
toolbox: {
          show: true,
          left: '0',
          feature: {
            mark: { show: true },
            restore: { show: false },
            saveAsImage: {
              show: true,
              pixelRatio: 1,
              title: '保存为图片',
              type: 'png',
              lang: ['点击保存']
            }
          }
        },
```


```