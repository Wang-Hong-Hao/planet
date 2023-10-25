static 类方法是在类本身上定义的。

> 静态方法调用直接在类上进行，不能在类的实例上调用。
```
class Car {
  constructor(name) {
    this.name = name;
  }
  static hello() {
    return "Hello!!";
  }
}

let myCar = new Car("Ford");

// 您可以在 Car 类上调用 'hello()' ：
document.getElementById("demo").innerHTML = Car.hello();

// 但不能在 Car 对象上调用：
// document.getElementById("demo").innerHTML = myCar.hello();
// 此举将引发错误。
```
> 具有静态成员的类，可以被子类化。
```
class Tripple {
  static tripple(n = 1) {
    return n * 3;
  }
}


class BiggerTripple extends Tripple {
  static tripple(n) {
    return super.tripple(n) * super.tripple(n);
  }
}


console.log(Tripple.tripple());// 3
console.log(Tripple.tripple(6));// 18
```