import messageComponent from './message.vue'
import Vue from 'vue'
let instance;
let instances = [];
let seed = 1
// 创建构造器
const MessageConstructor = Vue.extend(messageComponent)
// 定义全局调用的message方法
const message = function (options = {}) {
    // 每次调用生成ID
    let id = 'message_' + seed++;
    // 用户自定义的message关闭时触发的函数
    let userOnClose = options.onClose;
    // 包装关闭方法
    options.onClose = function() {
        message.close(id,userOnClose)
    };
    instance = new MessageConstructor({
        data: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    let verticalOffset = options.offset || 20;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    instance.verticalOffset = verticalOffset
    instance.id = id;
    instance.visible = true;
    instance.$el.style.zIndex = seed + 1000
    instances.push(instance);
    // return instance;
}
message.close = function(id,userOnClose) {
    
    let len = instances.length;
    let index = -1;
    let removedHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            // 执行用户自定义关闭时触发的函数
            if(typeof userOnClose === 'function') {
                userOnClose(instances[i])
            }
            // 关闭后删除实例
            instances.splice(i, 1);
            break;
        }
    }
    // 关闭时处理页面上现存的message顶部距离
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for (let i = index; i < len - 1 ; i++) {
        let dom = instances[i].$el;
        dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};
export default message
