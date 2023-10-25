```
class Example {
  constructor(name) {
    this.name = name
  }
  func() {
    console.log(this.name)
  }
}
/**
 * 1.class使用严格模式
 * 2.Example只能通过new调用
 * 3.func不能通过new调用
 * 4.func不可被枚举
 */
'use strict'
function Example(name) {
  if (!(this instanceof Example)) {
    throw new TypeError("Class constructor Example cannot be invoked without 'new'")
  }
  this.name = name
}
Object.defineProperty(Example.prototype, 'func', {
  value: function () {
    if (!(this instanceof Example)) {
      throw new TypeError("func is not a constructor")
    }
    console.log(this.name)
  },
  enumerable: false,
})




```