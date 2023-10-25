![](https://img2022.cnblogs.com/blog/2483371/202202/2483371-20220210113255428-240871411.png)


```
let option = {
        toolbox: {
          show: true,
          right: '0',
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
        title: {
          text: '总里程\n' + totalLength,
          top: '45%',
          textAlign: "center",
          left: "49%",
          textStyle: {
            color: '#666',
            fontSize: 14,
            fontWeight: '400'
          }
        },
        tooltip: {
          show: true,
          transitionDuration: 0,
          formatter: (params) => {
            return params.marker + ' ' + params.name + ': ' + params.value + ' 公里'
          }
        },
        series: [{
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          type: 'pie',
          radius: ['30%', '60%'],
          center: ["50%", "50%"],
          label: {
            show: false,
          },
          data: seriesData
        }, {
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          type: 'pie',
          silent: true, //取消高亮
          radius: ['30%', '60%'],
          center: ["50%", "50%"],
          labelLine: {
            normal: {
              length: 30,
              length2: 0,
              lineStyle: {
                color: 'transparent'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return '{name|' + params.name + ':' + params.percent + '%' + '}' + '\n{hr|}\n' + '{value|' + params.value + ' 公里' + '}'
              },
              rich: rich,
              padding: [2, 25, 0, 25]
            }
          },
          data: seriesData,
          z: -1
        }, {
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          type: 'pie',
          silent: true, //取消高亮
          radius: ['30%', '60%'],
          center: ["50%", "50%"],
          labelLine: {
            normal: {
              length: 30,
              length2: 0,
              lineStyle: {
                color: 'transparent'
              }
            }
          },
          label: {
            normal: {
              formatter: params => {
                return '\n{cir|●}\n'
              },
              rich: rich,
            }
          },
          data: seriesData,
          z: -1
        }, {
          itemStyle: {
            normal: {
              color: '#F2F9F7'
            }
          },
          type: 'pie',
          silent: true, //取消高亮
          radius: ['30%', '67%'],
          center: ["50%", "50%"],
          hoverAnimation: false, //取消动画效果
          data: seriesData,
          label: {
            normal: {
              show: false,
              position: 'inner',
              formatter: params => {
                return (
                  '{percent|' + params.percent + '%}'
                )
              },
              rich: rich,
            }
          },
          z: -1
        }]
      }


```