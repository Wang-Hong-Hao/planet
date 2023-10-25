
- grid-area 属性可以用于为网格项分配名称。然后，可以通过网格容器的 grid-template-areas 属性引用命名的网格项目
- grid-template-areas 属性在网格布局中规定区域
- grid-gap 属性定义网格布局中行与列之间间隙的尺寸
- grid-template-columns 属性规定网格布局中的列数（和宽度）

采用grid加栅格布局的方式，方便pc和移动端的转换，同时每个块之间的间距为10，添加上对应的样式，同时给每个区块加上对应的名字、颜色和高度（模拟内容的填充），小屏幕上不显示slider的内容, 当屏幕的尺寸大于500的时候，展示出来slider的内容,当屏幕的尺寸大于800的时候，改变整个布局方式

其实最本质的内容就是对不同的屏幕加载不同的css样式，你也可以使用媒体查询的方式加载css样式
```
<link rel="stylesheet" type="text/css" media="screen and (min-device-width: 500px)" href="tinyScreen.css" />

```
或者@import的方式

```
@import url("tinyScreen.css") (min-width: 500px);

```
![](https://img2023.cnblogs.com/blog/2483371/202306/2483371-20230614160012991-400872074.png)
![](https://img2023.cnblogs.com/blog/2483371/202306/2483371-20230614160031526-1572883667.png)
![](https://img2023.cnblogs.com/blog/2483371/202306/2483371-20230614160043092-168936583.png)

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 10px;
            grid-template-areas: "h h h h h h h h h h h h"
                "c c c c c c c c c c c c"
                "f f f f f f f f f f f f";
        }

        .header {
            grid-area: h;
            background: rgb(236, 167, 77);
            height: 60px;
        }

        .footer {
            grid-area: f;
            background: rgb(39, 200, 147);
            height: 160px;
        }

        .content {
            grid-area: c;
            background: rgb(30, 59, 30);
            height: 500px;
        }

        .slider {
            display: none;
            background: rgb(44, 125, 231);
            height: 60px;
        }
    </style>
    <style>
        @media screen and (min-width: 500px) {
            .container {
                grid-template-areas:
                    "h h h h h h s s s s s s"
                    "c c c c c c c c c c c c"
                    "f f f f f f f f f f f f";
            }

            .slider {
                display: block;
                grid-area: s;
            }
        }

        @media screen and (min-width: 800px) {
            .container {
                grid-template-areas:
                    "h h h h h h h h h h h h"
                    "s s s s c c c c c c c c"
                    "f f f f f f f f f f f f";
            }

            .slider {
                display: block;
                grid-area: s;
                height: 500px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">Header</div>
        <div class="slider">Slider</div>
        <div class="content">Content</div>
        <div class="footer">Footer</div>
    </div>
</body>

</html>
```