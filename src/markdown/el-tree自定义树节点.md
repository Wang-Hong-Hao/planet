# el-tree自定义树节点

## 需求：

在选择字典值的弹窗中，如果没有满足用户的值，可以让用户自定义，经理要求在二级之后的节点添加一个其他节点，点击其他时由用户输入

## 实现：

通过el-tre的`render-content`属性自定义节点渲染内容，此处使用jsx，[细节语法点我](https://github.com/vuejs/jsx-vue2#installation)

详细代码：

```js
    // 渲染树节点
    renderContent (h, { node, data, store }) {
      let custom = null
      if (data.other) {
        // 绑定click事件时需通过阻止冒泡阻止触发树节点nodeClick
        custom = (
          <span style={{ display: data.showInput ? 'inline-block' : 'none' }}>
            <el-input
              size='mini'
              style={{ width: '200px', marginRight: '10px' }}
              vModel={this.customTreeItem}
            />
            <el-button
              size='mini'
              type='text'
              vOn:click_stop={() => this.cancel(data)}
            >
              取消
            </el-button>
            <el-button
              size='mini'
              type='text'
              vOn:click_stop={() => this.apply(data, node)}
            >
              确定
            </el-button>
          </span>
        )
      }
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          {custom}
        </span>
      )
    },
```

需要注意的一点是 因为自定义内容中添加了button，点击是会冒泡触发树节点的`node-click`事件，导致重复调用点击的后续逻辑

动态绑定属性与在template中不太一样，通过`style={{width:10px}}`这种形式绑定

注意`vModel`,`vOn`以及阻止冒泡`click_stop`、阻止默认事件`click_prevent`写法		

