
地图JSON数据：[https://datav.aliyun.com/portal/school/atlas/area_selector#&lat=22.65267050733856&lng=114.18983459472656&zoom=10]()


### echarts 山东地图

```.js
data () {
    return {
      myChart: null,
      mapJson: JSON.stringify(mapJson),
    }
  },
  methods: {
    // 地图初始化
    mapInit () {
      //  获取dom
      this.myChart = this.$echarts.init(document.getElementById('map'))
      let nameMap = '山东省'
      this.loadMap(this.mapJson, nameMap) //初始化全省地图
    },
    // /**
    //  获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
    //  @params {String} mapCode:json数据的地址
    //  @params {String} name: 地图名称
    //  */
    //  注册地图
    loadMap (mapCode, name) {
      //各省份的数据
      let allData = [
        { name: '济南市', value: 396 },
        { name: '青岛市', value: 66 },
        { name: '烟台市', value: 222 },
        { name: '潍坊市', value: 688 },
        { name: '菏泽市', value: 75 },
        { name: '日照市', value: 121 },
        { name: '威海市', value: 91 },
        { name: '枣庄市', value: 479 },
        { name: '临沂市', value: 34 },
        { name: '滨州市', value: 631 },
        { name: '东营市', value: 1203 },
        { name: '淄博市', value: 988 },
        { name: '泰安市', value: 693 },
        { name: '聊城市', value: 934 },
        { name: '济宁市', value: 748 },
        { name: '德州市', value: 1267 },
      ]
      // 散点数据
      let markCity = {
        '济南市': [117.119999, 36.651216],
        '临沂市': [118.356448, 35.104672],
        '淄博市': [118.054927, 36.813487],
        '威海市': [122.120419, 37.513068]
      }
      // 初始化散点数据
      function convertData () {
        var res = []
        for (var i = 0; i < allData.length; i++) {
          var city = markCity[allData[i].name]
          if (city) {
            res.push({
              name: allData[i].name,
              value: city.concat(allData[i].value)
            })
          }
        }
        return res
      }
      this.$echarts.registerMap(name, mapCode)
      let option = {
        geo: {
          map: name,
          zoom: 1.5, //当前视角的缩放比例
          aspectScale: 0.85,
          layoutCenter: ['50%', '50%'], //地图位置
          layoutSize: '100%',
          roam: false,
          itemStyle: {
            normal: {
              borderColor: 'rgba(192,245,249,.8)',
              shadowColor: '#6FFDFF',
              // shadowColor: 'rgba(128, 217, 248, 1)',
              borderWidth: 3,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 10,
              //   areaColor: 'rgba(29,85,139,.6)',
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0,
            },
          },
        },
        tooltip: {
          show: true,
          formatter: (params) => {
            if (params.data)
              return (
                '<span style="width:195px;height:35px;line-height:28px;float:left;">&nbsp;&nbsp;' +
                params.name +
                '</span></br><span style="float:left;magin-top:50px;width:195px;height:35px;line-height:25px;">&nbsp;&nbsp;面积：' +
                params.data['value'] +
                '万亩</span>'
              )
          },
          extraCssText:
            "background:url('/asset/get/s/data-1630478118371-aR5gezvxy.png') 100% 100% repeat;width:195px;height:142px;",
        },
        series: [
          {
            name: 'Map',
            type: 'map',
            mapType: name,
            selectedMode: 'false', //是否允许选中多个区域
            aspectScale: 0.85,
            layoutCenter: ['50%', '50%'], //地图位置
            layoutSize: '100%',
            roam: true,
            zoom: 1.5, //当前视角的缩放比例
            roam: false, //是否开启平游或缩放
            scaleLimit: {
              //滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            label: {
              show: true,
              textStyle: {
                color: '#fff'
              },
              formatter: (params) => {
                return params.name.slice(0, 2)
              }
            },
            itemStyle: {
              normal: {
                areaColor: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 500,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: 'RGBA(47,145,236,1)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'RGBA(2,43,89,1)' // 50% 处的颜色
                  }],
                  global: true // 缺省为 false
                },
                borderColor: '#2793d3',
                borderWidth: 1,
              },
              emphasis: {
                borderColor: '#2793d3',
                borderWidth: 2,
                shadowColor: 'rgba(255, 255, 255, 0.2)',
                shadowBlur: 5,
                label: {
                  show: true,
                  textStyle: {
                    color: '#FFF',
                    fontSize: 16,
                  },
                },
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 2,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(26, 96, 166, 1)', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(26, 96, 166, 0.1)', // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              },
            },
            data: allData,
          }, {
            name: '散点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(),
            symbolSize: 15,//标记大小
            symbol: 'circle',
            // 			symbolSize: function (val) {
            // 				return val[2];
            // 			},
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            showEffectOn: 'render',
            itemStyle: {
              normal: {
                color: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(14,245,209,0.2)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(14,245,209,0.2)'
                  }, {
                    offset: 1,
                    color: 'rgba(14,245,209,1)'
                  }],
                  global: false // 缺省为 false
                },
              }

            },

          },
        ],
      }
      this.myChart.setOption(option)
    },
  }
}
```
