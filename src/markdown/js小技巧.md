### 1. 声明和初始化数组
```
const array = Array(5).fill(''); 
// 输出
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(()=>Array(5).fill(0)); 
// 输出
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5
```
### 2. 找出总和、最小值和最大值
```
const array  = [5,4,7,8,9,2];
```
- 和
```
array.reduce((a,b) => a>b?a:b);
// 输出: 9
```
- 最大值
```
array.reduce((a,b) => a>b?a:b);
// 输出: 9
```
- 最小值
```
array.reduce((a,b) => a<b?a:b);
// 输出: 2
```
### 3. 对字符串、数字或对象数组进行排序
- 排序字符串数组
```
const stringArr = ["Joe", "Kapil", "Steve", "Musk"]
stringArr.sort();
// 输出
(4) ["Joe", "Kapil", "Musk", "Steve"]

stringArr.reverse();
// 输出
(4) ["Steve", "Musk", "Kapil", "Joe"]
```
- 排序数字数组
```
const array  = [40, 100, 1, 5, 25, 10];
array.sort((a,b) => a-b);
// 输出
(6) [1, 5, 10, 25, 40, 100]

array.sort((a,b) => b-a);
// 输出
(6) [100, 40, 25, 10, 5, 1]
```
- 对象数组排序
```
const objectArr = [     { first_name: 'Lazslo', last_name: 'Jamf'     },    { first_name: 'Pig',    last_name: 'Bodine'   },    { first_name: 'Pirate', last_name: 'Prentice' }];
objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name));
// 输出
(3) [{…}, {…}, {…}]
0: {first_name: "Pig", last_name: "Bodine"}
1: {first_name: "Lazslo", last_name: "Jamf"}
2: {first_name: "Pirate", last_name: "Prentice"}
length: 3
```
### 4. 从数组中过滤出虚假值
```
const array = [3, 0, 6, 7, '', false];
array.filter(Boolean);
// 输出
(3) [3, 6, 7]
```
### 5. 对各种条件使用逻辑运算符
```
function doSomething(arg1){ 
    arg1 = arg1 || 10; 
// 如果尚未设置，则将 arg1 设置为 10 作为默认值
return arg1;
}

let foo = 10;  
foo === 10 && doSomething(); 
// is the same thing as if (foo == 10) then doSomething();
// 输出: 10

foo === 5 || doSomething();
// is the same thing as if (foo != 5) then doSomething();
// 输出: 10
```
### 6. 删除重复值
```
const array  = [5,4,7,8,9,2,7,5];
array.filter((item,idx,arr) => arr.indexOf(item) === idx);
// or
const nonUnique = [...new Set(array)];
// 输出: [5, 4, 7, 8, 9, 2]
```
### 7. 创建计数器对象或映射
```
let string = 'kapilalipak';

const table={}; 
for(let char of string) {
  table[char]=table[char]+1 || 1;
}
// 输出
{k: 2, a: 3, p: 2, i: 2, l: 2}
```
```
const countMap = new Map();
  for (let i = 0; i < string.length; i++) {
    if (countMap.has(string[i])) {
      countMap.set(string[i], countMap.get(string[i]) + 1);
    } else {
      countMap.set(string[i], 1);
    }
  }
// 输出
Map(5) {"k" => 2, "a" => 3, "p" => 2, "i" => 2, "l" => 2}
```
### 8. 可选链
```
undefined。
const user = {
  employee: {
    name: "Kapil"
  }
};
user.employee?.name;
// 输出: "Kapil"
user.employ?.name;
// 输出: undefined
user.employ.name
// 输出: VM21616:1 Uncaught TypeError: Cannot read property 'name' of undefined
```
### 9. 打乱数组
```
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list.sort(() => {
    return Math.random() - 0.5;
});
// 输出
(9) [2, 5, 1, 6, 9, 8, 4, 3, 7]
// Call it again
(9) [4, 1, 7, 5, 3, 8, 2, 9, 6]
```
### 10. 空合并
```
const foo = null ?? 'my school';
// 输出: "my school"

const baz = 0 ?? 42;
// 输出: 0
```
### 11. 使用解构简单交换两值
```
let a = 5;
let b = 8;
[a,b] = [b,a]

[a,b]
// 输出
(2) [8, 5]
```
