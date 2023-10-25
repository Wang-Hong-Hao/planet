##uniapp小程序props传值丢失

`uniapp中父组件向子组件传递prop时，如果prop是对象，对象内部不能包含function属性`
如果包含function属性则会被忽略掉 主要原因 uniapp props实现采用了JSON.parse(JSON.stringify(ret))，导致this中的data中会识别到对象如果包含function，会直接丢失到该属性


解决方案 可采用 provide/inject传值