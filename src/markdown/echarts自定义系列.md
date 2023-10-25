## echarts自定义系列

首先上效果图，最近接触了没做过的echarts自定义,记录一下解决方案

> tooltip提示重叠的所有数据

在tooltip里设置trigger为axios、axiosPointer设置type为cross之后再label的formatter里面触发会打印两个params、一个有当前鼠标位置对应在x轴的数值，另一个是当前的所有数据

拿到这两个数据后保存起来，在tooltip的formatter进行使用

> 图列换行

在legend中，legend.data是显示图例的数组

1. 在所需换行的地方插入空的字符串 “” 或者是 “/n”

```js
let legendsData = ["银时", "银时5", "王二小", "猹", "↵", "ink", "i123nk", "321", "qqq", "↵", "oso", "V"];
or
let legendsData = ["银时", "银时5", "王二小", "猹", "", "ink", "i123nk", "321", "qqq", "", "oso", "V"];
//将数组放入legend中
```

2. 还有一种就是给 legend的width 设值legend.width是显示图例的区域的宽度 宽度不够自动换行

3. 第三种办法是用 formatter进行设值



> 最后贴上核心代码

```js
// 加载报表内容
    initEchart () {
      var t = window.devicePixelRatio
      this.$refs[this.chartRef].style.zoom = t

      var fontSize = this.$diffDevice()
      var titlefontsize = 18
      if (window.devicePixelRatio > 1.25) {
        titlefontsize = 14
      }
      const that = this
      this.barChart = echarts.init(this.$refs[this.chartRef])
      let data = this.echart.dataList
      let categories = this.echart.laneList


      let types = []
      let colors = Color.getPieChartColor()
      this.echart.maintainProjectList.forEach((item, index) => {
        let newObj = {
          name: item,
          color: colors.length >= index + 1 ? colors[index] : ""
        }
        types.push(newObj)
      })
      let newSeries = []
      data.forEach((item, index) => {
        // 过滤item颜色
        let type = {}
        types.forEach((item1, index1) => {
          if (item.name == '') {
            type = {
              name: '',
              color: '#fff',
            }
          } else if (item.name == item1.name) {
            type = item1
          }
        })
        item.itemStyle = {
          normal: {
            color: type.color
          }
        }
        // 配置newSeries
        let newSeriesData = {
          type: "custom",
          renderItem,
          itemStyle: {
            opacity: 0.8,
            color: type.color,
            fontSize: fontSize
          },
          name: item.name,
          label: {
            show: true,
            //图形上显示数字
            formatter: (params) => {
              return params.value[3] > 2 ? params.data.year : ''
            }
          },
          encode: {
            x: [1, 2],
            y: 0
          },
          data: [item]
        }
        // push
        newSeries.push(newSeriesData)
      })
      function renderItem (params, api) {
        let categoryIndex = api.value(0)
        // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
        let start = api.coord([api.value(1), categoryIndex])
        let end = api.coord([api.value(2), categoryIndex])
        // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
        let height = api.size([0, 1])[1] * 0.9
        // shape 属性描述了这个矩形的像素位置和大小。
        // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
        // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
        // 如果矩形完全被剪掉，会返回 undefined.
        let rectShape = echarts.graphic.clipRectByRect(
          {
            // 矩形的位置和大小。
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
          },
          {
            // 当前坐标系的包围盒。
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
          }
        )
        // 这里返回为这个 dataItem 构建的图形元素定义
        return (
          rectShape && {
            // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
            type: "rect",
            shape: rectShape,
            // 用 api.style(...) 得到默认的样式设置。这个样式设置包含了
            // option 中 itemStyle 的配置和视觉映射得到的颜色。
            style: api.style()
          }
        )
      }
      let currentSeriesData = []
      let mouseCurrent = 0
      let option = {
        color:['#fff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              show: false,
              formatter: function (params) {
                if (params.seriesData.length !== 0) {
                  currentSeriesData = params.seriesData
                }
                if (params.seriesData.length === 0) {
                  mouseCurrent = params.value
                }
              }
            }
          },
          formatter: function (params) {
            let tipArr = []
            currentSeriesData.forEach((item, index) => {
              if (item.value[1] <= mouseCurrent && item.value[2] >= mouseCurrent) {
                tipArr.push(item)
              }
            })
            let str = ''
            tipArr.forEach((item, index) => {
              if (!item.data.name) {
                return
              }
              str += item.marker + item.data.year + '&nbsp' + (item.data.name || item.data.data_laneName) + '&nbsp' + '桩号' + item.value[1] + '-' + item.value[2] + '&nbsp' + item.value[3] + '公里' + '<br/>'
            })
            return str
          }
        },
        title: {
          text: "历年养护方案",
          left: "center",
          textStyle: {
            fontSize: titlefontsize
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {
              pixelRatio: window.devicePixelRatio
            }
          }
        },
        legend: {
          top: 20,
          data: this.echart.maintainProjectList,
          itemHeight: 10,
          textStyle: {
            fontSize: fontSize
          },
          left: 'center',
          width: '80%',

        },
        // 区域缩放
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            xAxisIndex: [0, 1],
            showDataShadow: false,
            height: 10,
            bottom: 10,
            borderColor: "transparent",
            backgroundColor: "#e2e2e2",
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: "#aaa"
            },
            labelFormatter: ""
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'weakFilter',
            showDataShadow: false,
            width: 10,
            left: 55,
            borderColor: "transparent",
            backgroundColor: "#e2e2e2",
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", // jshint ignore:line
            handleSize: 20,
            handleStyle: {
              shadowBlur: 6,
              shadowOffsetX: 1,
              shadowOffsetY: 2,
              shadowColor: "#aaa"
            },
            labelFormatter: ""
          }
        ],
        grid: {
          height: "auto",
          // top: 70
          top: this.echart.maintainProjectList.length > 7 ? 80 : 60,
          bottom:50,
        },
        xAxis: [
          {
            min: Math.floor(this.echart.minPile),
            max: Math.floor(this.echart.maxPile),
            // 间隔最小范围
            minInterval: 0.5,
            // 不显示0
            scale: true,
            // 分割段数
            splitNumber: 30,
            name: '上行线',
            nameLocation: 'start',
            nameTextStyle: {
              color: '#000',
              fontSize: fontSize,
              padding: [25, 0, 0, 0]
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            axisTick: {
              length: 0,
            },
            axisLabel: {
              color: '#000',
              fontSize: fontSize,
              showMaxLabel: true,
              showMinLabel: true,
            }
          }, {
            min: Math.floor(this.echart.minPile),
            max: Math.floor(this.echart.maxPile),
            minInterval: 0.5,
            scale: true,
            splitNumber: 30,
            name: '下行线',
            nameLocation: 'start',
            nameTextStyle: {
              color: '#000',
              fontSize: fontSize,
              padding: [0, 0, 25, 0]
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#ccc"
              }
            },
            axisTick: {
              length: 0,
            },
            axisLabel: {
              color: '#000',
              fontSize: fontSize,
              showMaxLabel: true,
              showMinLabel: true,
            }
          }
        ],
        yAxis: {
          data: categories,
          axisLabel: {
            color: '#000',
            fontSize: fontSize,
            // align: 'left'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            length: 50,
            margin: 10,
            lineStyle: {
              // color: "#d4d4d4"
              color: '#ccc'
            }
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        series: newSeries
      }
      this.barChart.setOption(option, true)
    },

    // 图表刷新
    resizeChart () {
      if (this.barChart && this.barChart['resize']) {
        this.barChart.resize()
      }
    },
```
