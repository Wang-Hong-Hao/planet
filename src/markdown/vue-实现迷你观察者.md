```

class Dep {
    constructor() {
        // 订阅任务队列，方式有相同的任务，用Set数据结构简单处理
        this.subscribers = new Set()
    }
    // 收集依赖
    depend () {
        if (activeUpdate) {
            this.subscribers.add(activeUpdate)
        }
    }
    // 派发更新
    notify () {
        this.subscribers.forEach(sub => sub())
    }
}
// 响应式数据
function observe (obj) {
    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            get () {
                dep.depend()
                return internalValue
            },
            set (newValue) {
                // 是否更新条件
                const changed = internalValue !== newValue
                internalValue = newValue
                if (changed) {
                    dep.notify()
                }
            },

        })

    })
}
// 创建activeUpdate保存更新函数
let activeUpdate = null

function autorun (update) {
    activeUpdate = update
    update()
    activeUpdate = null
    // const wrappedUpdate = () => {
    //     activeUpdate = wrappedUpdate
    //     update()
    //     activeUpdate = null
    // }
    // wrappedUpdate()
}



const state = {
    count: 0,
}
observe(state)
// 自动函数 模拟访问或读取属性 此处模拟读取了count
autorun(() => {
    console.log(state.count)
})
// 打印"count is: 0"

state.count++
// 打印"count is: 1"


```