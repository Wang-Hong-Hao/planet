### 全局zomm缩放后echarts鼠标偏移的问题

#### 最近项目里需要做很多图表，但所有的图表都有一个问题，就是鼠标hover触发位置与鼠标实际位置有偏差

举个例子：

​	柱状图鼠标移动到第二个柱子的时候却触发第一个柱子的tooltip提示框



最后发现问题所在是项目在main.vue里为适配不同分辨率的设备设置了全局的zoom缩放，具体看图
![](https://img2020.cnblogs.com/blog/2483371/202109/2483371-20210916232253325-1705762100.png)
![](https://img2020.cnblogs.com/blog/2483371/202109/2483371-20210916232303880-1906146173.png)
![](https://img2020.cnblogs.com/blog/2483371/202109/2483371-20210916232310964-1163196001.jpg)

>  解决办法：全局缩放影响到了echarts容器，通过dom为echarts容器还原缩放    `根据图表位置合理设置 transform-origin:0 0`

1. ```html
    <div :id="chartsCode" :style="`width: ${width}px; height:300px;zoom:${zoom};transform:scale(${1/zoom});transform-origin:0 0`"></div>
   ```


2. ```js
   data() {
   	return {
   		zoom:1
   	}
   }
   ```


3. ```js
   mounted() {
   	 this.zoom = 1 / document.body.style.zoom
        window.addEventListener("resize", () => {
         this.zoom = 1 / document.body.style.zoom
       })
   }
   ```

   
