```
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
```



```
 dataZoom: [
          // 给x轴设置滚动条
          {
            startValue: 1,
            endValue: this.dimension === 'roadCode' ? 8 : 6,
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            handleSize: 0, // 滑动条的 左右2个滑动条的大小
            height: 8, // 组件高度
            left: 50, // 左边的距离
            right: 40, // 右边的距离
            bottom: 10, // 右边的距离
            handleColor: '#EFEFEF', // h滑动图标的颜色
            handleStyle: {
              borderColor: '#409EFF',
              borderWidth: '1',
              shadowBlur: 2,
              background: '#EFEFEF',
              shadowColor: '#EFEFEF'
            },
            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                // 给颜色设置渐变色 前面4个参数，给第一个设置1，第四个设置0 ，就是水平渐变
                // 给第一个设置0，第四个设置1，就是垂直渐变
                offset: 0,
                color: '#409EFF'
              },
              {
                offset: 1,
                color: '#409EFF'
              }
            ]),
            backgroundColor: '#EFEFEF', // 两边未选中的滑动条区域的颜色
            showDataShadow: false, // 是否显示数据阴影 默认auto
            showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
            handleIcon:
              'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z',
            filterMode: 'filter'
          },
          // 下面这个属性是里面拖到
          {
            type: 'inside',
            show: true,
            xAxisIndex: [0],
            startValue: 1,
            endValue: this.dimension === 'roadCode' ? 8 : 6,
            zoomLock: true
          }
        ],
```