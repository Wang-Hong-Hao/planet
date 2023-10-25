效果图
![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220408105212906-1751678062.png)


```
import * as echarts from 'echarts'
export default function buildOption (arr) {
  let color = ['#ffd546', '#18c6ce', '#1c9bf6', '#fb6666']

  // var color = [

  //   new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  //     {
  //       offset: 0,
  //       color: '#ff960e',
  //     },
  //     {
  //       offset: 1,
  //       color: '#f9d12f',
  //     },
  //   ]),

  //   new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  //     {
  //       offset: 0,
  //       color: '#47b6ea',
  //     },
  //     {
  //       offset: 1,
  //       color: '#00ffcf',
  //     },
  //   ]),
  //   new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  //     {
  //       offset: 0,
  //       color: '#5f7ff2',
  //     },
  //     {
  //       offset: 1,
  //       color: '#7ba6ff',
  //     },
  //   ]),


  //   new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  //     {
  //       offset: 0,
  //       color: '#fb6666',
  //     },
  //     {
  //       offset: 1,
  //       color: '#ff960e',
  //     },
  //   ]),
  // ]
  if (arr.length > 4) {
    color.unshift('#5f7ff2')
  }
  let option = {
    backgroundColor: 'transparent',
    grid: {
      left: '17%',
      top: '30%',
      bottom: '20%',
      width: '65%'
    },
    // tooltip: {
    //   show: true,
    //   confine: true,
    //   formatter: (params => {
    //     return params.marker + params.name + ": " + params.value + " " + params.percent + '%'
    //   })
    // },
    legend: {
      show: false,
      color: "#C7DDFF",
      orient: "vertical",
      right: "20%",
      top: "30%",
      animation: true,
    },
    series: [
      {
        color: color,
        type: "pie",
        radius: ["35", "50"],
        center: ["50%", "50%"],
        label: {
          show: false,
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,0)',
        },
        data: arr,
      },
      {
        color: ['#5d92e1', 'rgba(0,0,0,0)', '#5d92e1', 'rgba(0,0,0,0)',],
        type: "pie",
        radius: ["59", "60"],
        center: ["50%", "50%"],
        label: {
          show: false,
        },
        select: {
          display: false,
        },
        hoverAnimation: false,
        tooltip: {
          show: false,
        },
        data: [25, 25, 25, 25],
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['0%', '45%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            color: '#13386a',
          },
        },
        label: {
          show: false,
        },
        data: [100],
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['45%', '47%'],
        hoverAnimation: false,
        clockWise: false,
        itemStyle: {
          normal: {
            color: '#326cb8',
          },
        },
        label: {
          show: false,
        },
        data: [100],
      }],
  }
  return option
}
```
```
 <el-row style="width:100%;height:calc(100% - 69px)">
      <el-col :span="12" style="width:50%;height:100%;position: relative">
        <chart-container id="distribute" ref="distribute" @chartClick="chartClick" @mouseover="mouseover"></chart-container>
        <!--为ECharts新增一个DOM空间-->
        <div class="info">
          <p class="name">{{info.name}}</p>
          <p class="value">{{info.value}}</p>
        </div>
      </el-col>
      <el-col :span="12" style="width:50%;height:100%">
        <div class="box">
          <div class="row" v-for="(item,index) in data" :key="index" :style="{'height':rowHeight}" @click="chartClick('',{'dataIndex':index})">
            <el-col :span="3" class="marker" :style="{'background-color':color[index],'color':color[index]}"></el-col>
            <el-col :span="7" class="name">{{item.spanTypeName + ':'}}</el-col>
            <el-col :span="5" class="count" :style="{'color':color[index]}">{{item.count}}</el-col>
            <el-col :span="9" class="perent" :style="{'color':color[index]}">{{(item.ratio ? item.ratio : 0) + '%'}}</el-col>
          </div>
        </div>
      </el-col>
    </el-row>
```
```
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
}
.marker {
  border-radius: 50%;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 10px;
}
.name {
  font-size: 0.8571rem;
  font-family: "Microsoft YaHei";
  color: #d9eaff;
}
.count,
.perent {
  font-size: 1.1429rem;
  font-family: "DIN";
  font-weight: bold;
}
.perent {
  text-align: right;
}

.row {
  width: 100%;
  height: 3.5rem;
  margin: 2px 0;
  border-radius: 4px;
  background-color: rgba(8, 29, 60, 0.3);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}
.row span {
  margin-right: 5px;
}
.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  p {
    text-align: center;
  }
  .name {
    font-size: 0.8571rem;
    font-family: "Microsoft YaHei";
    color: #e2e6ec;
  }
  .value {
    font-size: 1.7143rem;
    font-family: "DIN";
    color: #e2e6ec;
    font-weight: bold;
    line-height: 1;
  }
}
```