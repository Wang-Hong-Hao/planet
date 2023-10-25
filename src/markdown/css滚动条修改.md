```
.tablecontainer {
  //滚动条的滑块
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background-color: #ededed;
    border-radius: 4px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 53%, 0.4);
  }

  &:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: hsla(0, 0%, 53%, 0.1);
  }
}
```
隐藏滚动条
```
chrome 和Safari

.element::-webkit-scrollbar { width: 0 !important }
IE 10+

.element { -ms-overflow-style: none; }
Firefox

.element { overflow: -moz-scrollbars-none; }
```