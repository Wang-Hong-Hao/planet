# 最近写了一个echarts堆叠柱状图页面，因为经验不是很多，写个博客记录一下
![](https://img2020.cnblogs.com/blog/2483371/202109/2483371-20210907223234893-728469707.png)



### 先贴代码

```
<template>
  <div class="container-box">
    <div class="item-box">
      <div class="box" ref="clintBox">
        <div :id="chartsCode" :style="`width: ${width}px; height:400px;`"></div>
        <div class="tablebox">
          <table border="1px solid #000" class="mytable">
            <tr v-for="(item,index) in tableData" :key="index">
              <td width="100px" class="header" v-if="index === 0">
                <i class="poinit" style="background-color: #ffbb00"></i>
                {{'>' + '3年'}}
              </td>
              <td width="100px" class="header" v-if="index == 1">
                <i class="poinit" style="background-color: #a5a5a5"></i>
                {{'2-3年'}}
              </td>
              <td width="100px" class="header" v-if="index == 2">
                <i class="poinit" style="background-color: #ed7d31"></i>
                {{'1-2年'}}
              </td>
              <td width="100px" class="header" v-if="index == 3">
                <i class="poinit" style="background-color: #5b9bd5"></i>
                {{'0-1年'}}
              </td>
              <td v-for="(t) in item" :key="t" :width="filterWidth" class="mytd">{{t}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chartsCard',
  components: {
  },
  data () {
    return {
      option: [],
      roadNameList: [],
      tableData: [],
      width: 0,
    }
  },
  props: {
    data: {
      required: true,
    },
    code: {
      required: true,
    }
  },
  computed: {
    // 过滤路线名称
    filterRoadName () {
      let arr = []
      this.data.forEach(item => {
        arr.push(item.roadCode)
      })
      this.roadNameList = arr
      return this.roadNameList
    },
    // 根据传过来的数据长度动态计算表格的宽的
    filterWidth () {
      return (this.width - 300) / this.filterRoadName.length
    },
    // 获取图表容器的宽度
    chartsWith () {
      return this.$refs.clintBox.clientWidth
    },

    // 动态图表id
    chartsCode () {
      return 'chart' + this.code
    }
  },
  watch: {
    data: function () {
      this.init()
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.width = this.chartsWith
      setTimeout(() => {
        this.init()
      }, 200)
    })

  },
  methods: {

    init () {
      this.initChart()
      this.initTableData()

    },

    // 初始化echatrs
    initChart () {
      this.option = {
        tooltip: {
          trigger: "axis",
          formatter: '{b0}<br />{a0} : {c0}%<br/>{a1} : {c1}%<br/>{a2} : {c2}%<br/>{a3} : {c3}%',
        },
        grid: {
          // width: this.chartsWith * 0.8 + 'px',
          left: '150px',
          right: '150px',
          bottom: '25px',
        },
        xAxis: {
          show: true,
          data: this.filterRoadName,

          splitLine: {
            show: false,
          },
          axisTick: {
            show:true,
            length: 25, // 竖线的长度
            // interval:0

          }
        },
        yAxis: {
          max: 100,// 设置最大值是多少
          splitNumber: 10,// 设置分几段显示
          splitLine: {
            show: true,
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %',
          },

        },
        series: [{
          name: '0-1年',
          type: 'bar',
          stack: '使用情况',//相同的stack开启堆叠
          // data: [60, 20, 36, 10, 10, 20],
          data: this.initData('year01Length'),
          barWidth: 50,//柱子宽度
          barGap: '0%',/*多个并排柱子设置柱子之间的间距*/
          barCategoryGap: '0%',/*多个并排柱子设置柱子之间的间距*/
          itemStyle: {
            normal: { color: "#009587" },
          }
        }, {
          name: '1-2年',
          type: 'bar',
          stack: '使用情况',//相同的stack开启堆叠
          data: this.initData('year12Length'),
          barWidth: 50,//柱子宽度
          itemStyle: {
            normal: { color: "#2196f3" },
          }
        }, {
          name: '2-3年',
          type: 'bar',
          stack: '使用情况',//相同的stack开启堆叠
          data: this.initData('year23Length'),
          barWidth: 50,//柱子宽度
          itemStyle: {
            normal: { color: "#ffeb3b" },
          }
        }, {
          name: '3-4年',
          type: 'bar',
          stack: '使用情况',//相同的stack开启堆叠
          data: this.initData('year34Length'),
          barWidth: 50,//柱子宽度
          itemStyle: {
            normal: { color: "#9c27b0" },
          }
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.chartsCode))
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option, true)
      // myChart.resize()
    },

    // 初始化柱状图数据 计算每一个val在数据中和totalLength的百分比
    initData (val) {
      var serie = []
      this.data.forEach((item, index) => {
        let num = item[val]
        let total = 0
        let arr = [item.year01Length, item.year12Length, item.year23Length, item.year34Length]
        let arr1 = arr.filter(item => {
          if (item !== 'null') {
            return item
          }
        })
        arr1.forEach(item => {
          total += parseFloat(item)
        })
        //   // 计算占比
        var numcount = this.Percentage(num, parseFloat(total.toFixed(3)))
        serie.push(numcount)
      })
      return serie
    },

    //计算两者占比方法
    Percentage (num, total) {
      return (Math.round(num / total * 10000) / 100.00)// 小数点后两位百分比
    },

    // 初始化表格数据
    initTableData () {
      let tableArr = []
      console.log(this.data)
      for (let i = 0; i <= 3; i++) {
        let arr = []
        let str = ('year' + i) + (i + 1 + 'Length')
        this.data.forEach((item, index) => {
          arr.push(item[str])
        })
        tableArr.unshift(arr)
      }
      this.tableData = tableArr
    },

  },
}

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #f5f7fa;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #f5f7fa;
}
.item-box {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: start;
}
.box {
  width: 100%;
  position: relative;
}
.tablebox {
  width: 100%;
  height: 300px;
}

.mytable {
  border-collapse: collapse;
  margin-left: 50px;
}
.mytable td {
  padding: 5px 10px;
  text-align: center;
}
.mytable .header {
  text-align: left;
}
.mytd {
  height: 25px !important;
}
.poinit {
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>

```
 ## 在echarts里option中的series的数组数据中我们可以通过stack属性控制是否堆叠，当我们的两个数据需要堆叠显示时，我们只需要给他两个的stack设置相同名称就可以了！

    实现等高的堆叠图，需要对数据进行处理
  - 参考 https://blog.csdn.net/qq_16416993/article/details/108118443 
  this.initData('year12Length') 返回一个数组 里面的每个元素是数据里每个对象的year12Length的值相对于>3年以下总和的百分比


## 修改 tooltip 显示百分比
echarts提示框显示百分比  数据已经转换好了 只需在后面加%号
```
tooltip: {
          trigger: "axis",
          formatter: '{b0}<br />{a0} : {c0}%<br/>{a1} : {c1}%<br/>{a2} : {c2}%<br/>{a3} : {c3}%',
        },
```
## 实现底部表格参考 

  - https://www.jianshu.com/p/731d6b88f7ca

  因为实现起来难度较大 所以采用的是elementui的table组件 通过给定option配置项grid:{left:'100px',right:'100px'}此时图表距离canvas画布左右均有100px的空间
canvas的宽度是100% 所以我们等通过this.$refs.fatherBox.clientWidth的方式获取到canvas父盒子的宽度 然后减去左右空白距离（200）除以柱子个数计算属性动态的计算出x轴分隔的宽度同时指定给表格的宽度结合定位调整表格的位置，大体上能实现这种效果

  因为element-ui的表格不好实现 所以手写的table表格 表格顶部与图表对齐实现方式：图表配置项里 grid：{left：'100px',right：'100px',bottom：'25px'}指定的是图表相对于canvas的上下左右的距离 底部25px为x轴竖线的长度 表格的父容器和图表的父容器宽度都是100% 给表格和图表相同的左边距即可
  td的宽度通过计算属性拿到图表父容器的宽度 然后（父宽度  - 图表的左右边距）/ 柱状图的个数

### 碰到的小坑
 子组件渲染echarts时父组件还没有获取到数据就渲染了子组件 这是传过来的是空值 子组件也就无法显示
`解决方法`：v-if="tableData.length !== 0" 判断一下

watch里面调用methods方法不能使用箭头函数 否则会报错
