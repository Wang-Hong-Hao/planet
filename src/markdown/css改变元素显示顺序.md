### 通过改变order值来改变div的前后顺序，值越低越靠前（沿着主轴方向算，越接近起点），反之亦然，可以设置负值
`父元素开启dispaly:flex  子元素order在没有设置的情况下，其默认值为零`

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box{
            width: 500px;
            height: 500px;
            background-color: steelblue;
            border: 1px solid black;
            box-sizing: border-box;
            margin: auto;
            display: flex;
            flex-direction: column;
        }
        .box div{
            width: 100px;
            height: 100px;
            border: 1px dashed brown;
            box-sizing: border-box;
        }
        .div1{
            order: 4;
        }
        .div2{
            order: 3;
        }
        .div3{
            order: 2;
        }
        .div4{
            order: 1;
            /* order在没有设置的情况下，其默认值为零
            通过改变order值来改变div的前后顺序，值越低越靠前（沿着主轴方向算，越接近起点），反之亦然，可以设置负值
            */
        }
        .div5{
            /* order:-1; */
        }
    </style>
</head>
<body>
    <div class="box">
        <div class="div1">111</div>
        <div class="div2">222</div>
        <div class="div3">333</div>
        <div class="div4">444</div>
        <div class="div5">555</div>
    </div>
</body>
</html>
```