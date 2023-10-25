#### 首先main.js中通过preload进行预加载脚本 __dirname字符串指向当前正在执行的脚本的路径
```
const { app, BrowserWindow } = require('electron');//引入electron
const path = require('path');
let win;
let windowConfig = {
  width: 300,
  height: 600,
  minWidth: 300,
  webPreferences: {
    nodeIntegration: true,// 是否集成 Nodejs
    preload: path.join(__dirname,'preload.js')
  },
  transparent: true,
  frame: false,
  // alwaysOnTop: true,
  resizable: true,//可否缩放
  movable: true//可否移动
};//窗口配置程序运行窗口的大小
function createWindow() {
  win = new BrowserWindow(windowConfig);//创建一个窗口
  win.loadURL(`file://${__dirname}/web/dist/index.html`);//在窗口内要展示的内容index.html 就是打包生成的index.html
  win.webContents.openDevTools();  //开启调试工具
  win.on('close', () => {
    //回收BrowserWindow对象
    win = null;
  });
  win.show()

}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (win == null) {
    createWindow();
  }
});

const ipcMain = require('electron').ipcMain;
ipcMain.on('closeApp', function () {
  app.quit();
});
ipcMain.on('window-min', function () {
  win.minimize();
});
```

#### preload.js
```
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    minApp: () => ipcRenderer.send('window-min'),
    closeApp:() => ipcRenderer.send('closeApp')
})
```

#### 然后页面中通过`window.electronAPI`访问定义的方法即可