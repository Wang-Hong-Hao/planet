```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Document</title>
    <!-- 1. 如果是移动端开发，请在head标签内添加viewport meta标签，以达到最佳的绘制性能 -->
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style>
      /* 通过 css 为地图容器指定高度、宽度； */
      #container {
        width: 1920px;
        height: 1080px;
      }
    </style>
    <script type="text/javascript">
      window._AMapSecurityConfig = {
        securityJsCode: "cc2018dc6e0480a5342d71d7fa7a1e48",
      };
    </script>
    <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=a60e52709801c0f7f70599610a168119"
    ></script>
  </head>

  <body>
    <!-- 2. 添加div标签作为地图容器，同时为该div指定id属性； -->
    <div id="container"></div>
    <script>
      // 创建的同时可以给地图设置中心点、级别、显示模式、自定义样式等属性：
      let map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.98, 36.67], //中心点坐标
        viewMode: "3D", //使用3D视图
      });
      // //添加实时路况图层 默认情况下，地图只显示标准底图，如需要叠加别的图层，可以通过map.add方法添加图层：
      // var trafficLayer = new AMap.TileLayer.Traffic({
      //   zIndex: 10,
      // });
      // map.add(trafficLayer); //添加图层到地图
      var marker = new AMap.Marker({
        position: [116.98111, 36.67111],
      });
      map.add(marker); //添加标记点
      try {
        AMap.plugin("AMap.DistrictSearch", () => {
          // 创建行政区查询对象
          var district = new AMap.DistrictSearch({
            // 返回行政区边界坐标等具体信息
            extensions: "all",
            // 设置查询行政区级别为 区
            level: "city",
            subdistrict: 0,
          });

          district.search("济南市", (status, result) => {
            console.log(status, result);
            // 获取济南市的边界信息
            var bounds = result.districtList[0].boundaries;
            var polygons = [];
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                  map: map,
                  strokeWeight: 1,
                  path: bounds[i],
                  fillOpacity: 0.7,
                  fillColor: "#CCF3FF",
                  strokeColor: "#CC66CC",
                });
                polygons.push(polygon);
              }
              // 地图自适应
              // map.setFitView();
            }
          });
        });
      } catch (e) {
        console.log(e);
      }
    </script>
  </body>
</html>

```