
> Symbol 彩色图标这是一种全新的使用方式，应该说这才是未来的主流

## 优缺点介绍

+   多色图标，不再受单色限制。`Font class` 和 `Unicode`只能调整图标大小，颜色等；默认情况下不支持多色，直接添加多色图标会自动去色。
+   Symbol 不能设置`color`属性；`Font class` 和 `Unicode`图标可以通过一些技巧，支持像字体那样，可通过`font-size`, `color` 来调整样式。
+   兼容性较差，支持 IE9+，及现代浏览器。
+   浏览器渲染 SVG 的性能一般，还不如 png。**建议使用的时候将普通图标和彩色图标分开始用**

## [阿里矢量素材图标库](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.iconfont.cn%2Fhome%2Findex)

* * *

## 1.Symbol 彩色图标

* * *

###### 添加项目

![](https://upload-images.jianshu.io/upload_images/23175847-3178c6e55d704b01.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

  

![](https://upload-images.jianshu.io/upload_images/23175847-93964808fb454c80.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

![](https://upload-images.jianshu.io/upload_images/23175847-fe72569c8532b055.png?imageMogr2/auto-orient/strip|imageView2/2/w/327/format/webp)

image.png

###### 下载项目

image.png

#### 编辑图标

###### 1\. 将下载的包解压 修改个看得过去的名字

###### 2\. 打开 `win + r` 打开 `cmd`, 在 `cmd` 中打开已解压的文件夹 `cd 文件地址`

image.png

###### 3\. 安装 iconfont-tools

```undefined
npm install -g iconfont-tools
```

###### 4\. 执行 iconfont-tools

```undefined
iconfont-tools
```

> 根据提示 填写相关信息

image.png

> 此时文件夹内会有 `iconfont` 文件夹

#### uni-app 引用

###### 打开生成的iconfont文件夹，将 `iconfont.css`引入 项目中的`static`文件中，文件管理随项目规定

image.png

> 圈出来的都是可以直接在文件中更改的 用的时候用更改过后的名字就好, 为了方便 我将`.icon` 的`width`和`height`调整成了300rpx

###### 打开 `app.vue` 文件

```dart
<style lang="scss">
  // 引入阿里矢量素材图标库
  @import '@/static/iconfont.css';
        .
        .
        .
</style>
```

###### 页面使用

```xml
<template>
  <view class="icon icon-a-jiujiuping"></view>
</template>
```

image.png

* * *

## 2.Font class普通单色图标

* * *

###### 1\. 创建一个普通图标的项目，添加普通图标不需要下载

###### 2\. 进入我的项目 点击 `暂无代码，生成代码`

image.png

  

image.png

###### 3.在uni-app向程序的static中创建一个`icon.css`文件 复制点开的链接中的代码

image.png

```css
@font-face {
  font-family: "iconfont"; /* Project id 3365557 */
  src: url('https://at.alicdn.com/t/font_3365557_u8wf0h1d7k.woff2?t=1651127283524') format('woff2'),
       url('https://at.alicdn.com/t/font_3365557_u8wf0h1d7k.woff?t=1651127283524') format('woff'),
       url('https://at.alicdn.com/t/font_3365557_u8wf0h1d7k.ttf?t=1651127283524') format('truetype');
}
```

###### 4.在app.vue中引入`icon.css`

```dart
<style lang="scss">
  // 引入阿里矢量素材图标库
  @import '@/static/iconfont.css';   // 彩色图标
  @import '@/static/icon.css';    // 普通图标
        .
        .
        .
</style>
```

###### 5.页面使用

```xml
<template>
    <!-- 彩色图标 -->
    <view class="icon icon-a-jiujiuping"></view>
    <!-- 普通图标 -->
    <view class="iconfont icon-settings"></view>
</template>
```
# 注意
小程序使用图标后如果`font`文件夹放在`static`目录下在上传代码时会出现font文件未上传的情况
原因是微信小程序在上传代码时static静态资源目录会有默认白名单，font文件夹不在白名单内导致无法上传
把`font`文件夹放到项目根目录即可
