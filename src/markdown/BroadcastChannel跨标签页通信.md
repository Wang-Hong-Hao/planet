# 前端跨页面通信：Broadcast Channel

> 它允许同源的不同浏览器窗口，Tab 页，frame 或者 iframe 下的不同文档之间相互通信。通过触发一个 message 事件，消息可以广播到所有监听了该频道的 BroadcastChannel 对象。

BroadcastChannel，就字面意思来言，叫做“广播频道”，官方文档说，该API是用于同源不同页面之间完成通信的功能

**一、与postMessage区别：**

它与postMessage的区别就是：BroadcastChannel只能用于同源的页面之间进行通信，而postMessage却可以用于任何的页面之间的通信，换句话说，BroadcastChannel可以认为是postMessage的一个实例，它承担了postMessage的一个方面的功能。

**二、 BroadcastChannel的使用方法：**

首先我们先要初始化一下BroadcastChannel：

> const setChannel = new BroadcastChannel('demos');

传入一个string,用这个来标识BroadcastChannel

发送消息： 发送消息的话使用它的postMessage方法，但是记住在使用的页面也要初始化BroadcastChannel：

> setChannel.postMessage('要发送消息啦啦啦啦啦啦啦');

监听消息： 要想监听方法的话使用onmessage方法来获取：

> setChannel.onmessage =function(e) {
> 
>     console.log('接收到消息:', e.data);
> 
>     //一大波你要要的操作
> 
> };

关闭连接：

> setChannel..close();
