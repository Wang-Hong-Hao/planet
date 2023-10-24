### vuex模块化使用

store结构

- store
  - index.js
  - modules
    - d2admin
      - index.js
      - modules
        - log.js
        - zoomGlobal.js

`index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

import d2admin from './modules/d2admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    d2admin
  }
})

```

`modules/d2admin/index.js`

```js
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
  namespaced: true,
  modules
}

```

``modules/d2admin/modules/log.js``

```js
import dayjs from 'dayjs'
import { get, toString } from 'lodash'
import util from '@/libs/util.js'

export default {
  namespaced: true,
  state: {
    // 错误日志
    list: []
  },
  getters: {
    /**
     * @description 返回现存 log (all) 的条数
     * @param {*} state vuex state
     */
    length (state) {
      return state.list.length
    },
    /**
     * @description 返回现存 log (error) 的条数
     * @param {*} state vuex state
     */
    lengthError (state) {
      return state.list.filter(l => l.type === 'error').length
    }
  },
  actions: {
    /**
     * @description 添加一个日志
     * @param {Object} param type {String} 类型
     * @param {Object} param err {Error} 错误对象
     * @param {Object} param instance {Object} vue 实例
     * @param {Object} param info {String} 信息
     */
    add ({ state, rootState }, { type, err, instance, info }) {
      // store 赋值
      state.list.push(Object.assign({
        // 记录类型 "log" or "error"
        type: 'log',
        // 信息
        info: '',
        // 错误对象
        err: '',
        // vue 实例
        instance: '',
        // 当前用户信息
        user: rootState.d2admin.user.info,
        // 当前用户的 uuid
        uuid: util.cookies.get('uuid'),
        // 当前的 token
        token: util.cookies.get('token'),
        // 当前地址
        url: get(window, 'location.href', ''),
        // 当前时间
        time: dayjs().format('YYYY-M-D HH:mm:ss')
      }, {
        type,
        err,
        instance,
        info: toString(info)
      }))
    }
  },
  mutations: {
    /**
     * @description 清空日志
     * @param {Object} state vuex state
     */
    clean (state) {
      // store 赋值
      state.list = []
    }
  }
}

```

`自己写的保存和读取主框架zoom缩放 zoomGlobal`

```js
export default {
    namespaced: true,
    state:{
        zoom:1,
    },
    getters:{
        getZoom(state) {
            return state.zoom
        }
    },
    mutations:{
        setZoom (state,zoom) {
            state.zoom = zoom
        }
    }
}
```

> 使用

```js
import { mapState, mapActions } from 'vuex'
export default {
   	created () {
    	//根据窗口缩放比例对页面进行缩放
    	this.$store.commit('d2admin/zoomGlobal/setZoom', 1 * window.devicePixelRatio)
  	},
	computed: {
   		...mapState('d2admin/menu', ['header']),
    	...mapState('d2admin/user', ['info']),
        ...mapGetters('d2admin', {logLength: 'log/length',logLengthError: 'log/lengthError'}),
  	},
	methods: {
    	...mapActions('d2admin/account', ['logout']),
        ...mapMutations('d2admin/log', ['clean']),
  	}, 
}


```
