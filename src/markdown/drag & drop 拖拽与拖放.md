
# 相关重点
1. DataTransfer 对象：退拽对象用来传递的媒介，使用一般为Event.dataTransfer。
2. draggable 属性：就是标签元素要设置draggable=true，否则不会有效果，例如：
 ```
<div title="拖拽我" draggable="true">列表1</div>
```
3. ondragstart 事件：当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
4. ondragenter 事件：当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上
5. ondragover 事件：拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上
6. ondrop 事件：被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上
7. ondragend 事件：当拖拽完成后触发的事件，此事件作用在被拖曳元素上
8. Event.preventDefault() 方法：阻止默认的些事件方法等执行。在ondragover中一定要执行preventDefault()，否则ondrop事件不会被触发。另外，如果是从其他应用软件或是文件中拖东西进来，尤其是图片的时候，默认的动作是显示这个图片或是相关信息，并不是真的执行drop。此时需要用用document的ondragover事件把它直接干掉。
9. Event.effectAllowed 属性：就是拖拽的效果。

# 应用
在需要拖拽的元素上监听ondragstart 在目标容器设置ondragover和 ondrop 事件。


可以利用dataTransfer来传递数据
```
// 拖拽开始
    dragstart (e) {
      console.log('拖拽开始', e)
      e.dataTransfer.dropEffect = 'copy'
      e.dataTransfer.effectAllowed = 'uninitialized'
     // setDate第一个format参数值有text/plain、text/html、text/uri-list等
      e.dataTransfer.setData('text/html', e.target.innerHTML)
    },
    // 拖拽结束
    dragend (e) {
      console.log('拖拽结束', e)
    }
```


# 参考（转载）

### 文章目录

+   [一、HTML 拖放基础](#)
+   +   [1\. 如何让一个元素可拖拽](#)
    +   [2\. 定义拖拽数据](#)
    +   [3\. 定义拖拽图像](#)
    +   [4\. 定义拖拽效果](#)
    +   [5\. 定义拖拽放置区](#)
    +   [6\. 定义放置效果](#)
    +   [7\. 拖拽结束](#)
+   [二、拖放事件](#)
+   [三、拖放的重点api及方法](#)
+   +   [1\. DragEvent 接口](#)
    +   [2\. DataTransfer 接口](#)
    +   [3\. DataTransferItem 接口](#)
    +   [4\. DataTransferItemList 接口](#)

# 一、HTML 拖放基础

HTML 拖放（Drag and Drop）接口使应用程序能够在浏览器中使用拖放功能。例如，用户可使用鼠标选择可拖拽（draggable）元素，将元素拖拽到可放置（droppable）元素，并释放鼠标按钮以放置这些元素。拖拽操作期间，会有一个可拖拽元素的半透明快照跟随着鼠标指针。

## 1\. 如何让一个元素可拖拽

让一个元素可被拖拽需要添加 draggable 属性，值为true。

```ts
<p id="p1" draggable="true">This element is draggable.</p>

const element = document.getElementById("p1");
element.addEventListener("dragstart", (event)=>{
    event.dataTransfer.setData("text/plain", '我是一条拖拽数据');
});
```

## 2\. 定义拖拽数据

每个 drag event 都有一个dataTransfer 属性，其中保存着拖拽事件的数据。这个属性（DataTransfer 对象）也有管理拖拽数据的方法。setData() 方法为拖拽数据添加一个项

```ts
element.addEventListener("dragstart", (event)=>{
  // 添加拖拽数据
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
});
```

## 3\. 定义拖拽图像

拖动过程中，从拖动目标(dragstart)事件触发的元素生成半透明图像，并在拖动过程中跟随鼠标指针一起移动。可通过DataTransfer.setDragImage自定义拖拽图像。

```ts
element.addEventListener("dragstart", (event)=>{
 	var img = new Image();
  	img.src = 'example.gif'; // 记得替换成真实路径
  	event.dataTransfer.setDragImage(img, 10, 10);
});
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/5194514fe9564db38a565be3b0440ee1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rGf5bCP6Jmr5YS_,size_20,color_FFFFFF,t_70,g_se,x_16)

## 4\. 定义拖拽效果

拖拽过程中浏览器显示的鼠标样式可以反映出拖放操作的类型。可以通过DataTransfer.dropEffect来控制用户拖拽过程中鼠标的样式。有 3 个效果可以定义：

+   copy 表明被拖拽的数据将从它原本的位置拷贝到目标的位置。
+   move 表明被拖拽的数据将被移动。
+   link 表明在拖拽源位置和目标位置之间将会创建一些关系表格或是连接。

在拖拽过程中，拖拽效果也许会被修改以用于表明在具体位置上具体效果是否被允许，如果允许，在该位置则被允许放置。

```ts
element.addEventListener('dragstart', event => {
    event.dataTransfer.dropEffect = "copy";
});
```

## 5\. 定义拖拽放置区

当拖拽一个项目到 HTML 元素中时，浏览器默认不会有任何响应。想要让一个元素变成可释放区域，该元素必须设置 ondragover和 ondrop 事件。

```ts
// 定义拖拽放置区（每个处理程序调用preventDefault()来阻止对这个事件的其它处理过程（如触点事件或指针事件）。
<p id="target" ondrop="dropHandler(event)" ondragover="dragoverHandler(event)">Drop Zone</p>

dragoverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

dropHandler(ev) {
    event.preventDefault();
    // 获取目标的 id 并将移动的元素添加到目标的 DOM
    var data = ev.dataTransfer.getData('text/plain');
    event.target.appendChild(document.getElementById(data));
}

```

## 6\. 定义放置效果

drop事件的处理程序是以程序里指定的方法处理拖拽数据。一般，程序调用 getData() 方法取出拖拽项目并按一定方式处理。程序意义根据 dropEffect 的值和(或)可变更关键字的状态而不同。

```ts
<div id="p1" draggable="true" ondragstart="dragstartHandler(event)" style="background-color: skyblue;">
  This element is draggable.
</div>

<br /><br />

<div id="target" ondragover="dragoverHandler(event)" ondrop="dropHandler(event)" style="width:300px;height:200px;background-color:plum;">
  Drop Zone
</div>

dragstartHandler(event) {
    // 将被拖拽元素的id添加到拖拽数据项列表中
    event.dataTransfer.setData('application/my-app', event.target.id);
    event.dataTransfer.dropEffect = 'move';
}

dragoverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

dropHandler(event) {
    event.preventDefault();
    // 获取被拖拽元素的id,并将该id对应的元素添加到目标放置区中
    var data = event.dataTransfer.getData('application/my-app');
    event.target.appendChild(document.getElementById(data));
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/b88e851542c64170bdb69d6e33cc8276.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rGf5bCP6Jmr5YS_,size_20,color_FFFFFF,t_70,g_se,x_16)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/4b3a9c3c34f249dbb510d6920be2b779.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rGf5bCP6Jmr5YS_,size_20,color_FFFFFF,t_70,g_se,x_16)

## 7\. 拖拽结束

拖拽操作结束时，在源元素（开始拖拽时的目标元素）上触发 dragend事件。不管拖拽是完成还是被取消这个事件都会被触发。dragend事件处理程序可以检查dropEffect 属性的值来确认拖拽成功与否。

# 二、拖放事件

![drag|](https://img-blog.csdnimg.cn/8ca1abbfb376429c82864fc04f59c2fc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5rGf5bCP6Jmr5YS_,size_20,color_FFFFFF,t_70,g_se,x_16)

# 三、拖放的重点api及方法

## 1\. DragEvent 接口

> DragEvent 是一个表示拖、放交互的一个DOM event 接口。用户通过将指针设备（例如鼠标）放置在触摸表面上并且然后将指针拖动到新位置（诸如另一个DOM元素）来发起拖动。 应用程序可以按应用程序特定的方式自由解释拖放交互。

```ts
interface DragEvent extends MouseEvent {
    // 返回事件的 DataTransfer 对象。 
    readonly dataTransfer: DataTransfer | null;
}

declare var DragEvent: {
    prototype: DragEvent;
    new(type: string, eventInitDict?: DragEventInit): DragEvent;
};

/**
 * 创建一个拖放事件
 * type: 拖拽事件类型 -> drag、dragend、dragenter、dragleave、dragover、dragstart、drop
 * DragEventInit: 即 {dataTransfer: DataTransfer}
*/
event = new DragEvent(type, DragEventInit);

// 具体应用: 创建一个drop事件（当元素或选中的文本在可释放目标上被释放时触发）
const dataTransfer = new DataTransfer();
dataTransfer.dropEffect = 'move';
let dragEventInit: DragEventInit = { dataTransfer: dataTransfer }
const dropEvent = new DragEvent('drop', dragEventInit);
element.dispatchEvent(dropEvent); // 触发drop事件
```

## 2\. DataTransfer 接口

> DataTransfer对象用于保存在拖放操作期间被拖动的数据。 它可以保存一个或多个数据项，每个数据项都是一种或多种数据类型。

```ts
interface DataTransfer {
	// 获取当前选定的拖放操作类型或者设置的为一个新的类型。值必须为  none, copy, link 或 move。 如果操作类型不是 effectAllowed 属性允许的操作类型，则操作将失败。
    dropEffect: "none" | "copy" | "link" | "move";
	
	// 提供所有可用的操作类型。
    effectAllowed: "none" | "copy" | "copyLink" | "copyMove" | "link" | "linkMove" | "move" | "all" | "uninitialized";
    
    // 包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表。
    readonly files: FileList;
    
    // 提供一个包含所有拖动数据列表的 DataTransferItemList 对象。
    readonly items: DataTransferItemList;

    // 一个提供 dragstart (en-US) 事件中设置的格式的 strings 数组。
    readonly types: ReadonlyArray<string>;
    
	// 删除指定格式的数据。参数可选。如果格式为空或未指定，则删除所有数据。如果指定类型的数据不存在，或者 data transfer 中不包含任何数据，则该方法不会产生任何效果。
    clearData(format?: string): void;
 
 	// 返回指定格式的数据，如果该格式的数据不存在或 data transfer不包含数据，则返回空字符串。
    getData(format: string): string;
   
   // 往拖放数据中添加一条指定格式的数据。format有：text/plain、text/html、text/uri-list等。
    setData(format: string, data: string): void;

    // 设置自定义的拖动图像。使用指定元素更新拖动feedback，替换任何先前指定的feedback。
    setDragImage(image: Element, xOffset: number, yOffset: number): void;
}

declare var DataTransfer: {
    prototype: DataTransfer;
    new(): DataTransfer; // 生成并且返回一个新的 DataTransfer 对象
};

```

## 3\. DataTransferItem 接口

> 一个拖拽数据项。在一个拖拽操作中，每个 drag event 都有一个dataTransfer 属性，它包含一个存有拖拽数据的 list ，其中每项都是一个DataTransferItem。

```ts
interface DataTransferItem {
    // 拖拽项的种类，string或file。
    readonly kind: string;
    
    // 该拖拽数据项的类型
    readonly type: string;
    
    // Returns a File object, if the drag data item kind is File.
    getAsFile(): File | null;
    
    // 使用拖拽项的字符串作为参数执行指定回调函数。
    getAsString(callback: FunctionStringCallback | null): void;
	// 返回一个基于 FileSystemEntry 的对象来表示文件系统中选中的项目。通常是返回一个FileSystemFileEntry 或是 FileSystemDirectoryEntry 对象.
    webkitGetAsEntry(): FileSystemEntry | null;
}

```

## 4\. DataTransferItemList 接口

> DataTransferItemList对象表示一组被拖动项的DataTransferItem 对象的列表。在拖动操作期间，每个DragEvent 都有一个 dataTransfer 属性，该属性是 DataTransferItemList。

```ts
interface DataTransferItemList {
    // 返回列表中拖动项的数量
    readonly length: number;

    // 将一个string类型的数据项添加到拖动项列表中。 数据是纯文本，必须提供类型。
    add(data: string, type: string): DataTransferItem | null;
    
    // 将一个File类型的数据项添加到拖动项列表中。
    add(data: File): DataTransferItem | null;

    // 清空拖动项列表
    clear(): void;

    // 根据索引删除拖动项列表中的数据。
    remove(index: number): void;
    
    // 根据索引获取指定拖拽项
    [index: number]: DataTransferItem;
}
```

参考资料  
MDN的HTML 拖放 API：[https://developer.mozilla.org/zh-CN/docs/Web/API/HTML\_Drag\_and\_Drop\_API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)