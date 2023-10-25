1、concat()
a=[];
a.concat([1,2,3,4]);
 此时a还是为[]，返回的结果为合并后的值。因为concat()方法不会改变原来的数组，只会返回合并后新的数组，所以如果a想要得到合并的值，就必须将返回的值赋值给a：
a = a.concat([1,2,3,4]);

2.、for循环 + push() 或者用ES6的扩展运算符…
for( var t in [1,2,3,4]){
     a.push(t);
}
或者
a.push(...[1,2,3,4]);

3、push.apply()
b=[];
b.push.apply(b,[1,2,3,4]);
push()和push.apply()的区别：
如：
a.push([1,2,3,4]);
b.push.apply(b,[1,2,3,4]);
结果为：
a：
[Array(4)]
    0: (4) [1, 2, 3, 4]
    length: 1
此时b：
[1, 2, 3, 4]
也就是说a[0]与b相同。
当然也可以用扩展运算符：

a.push(...[1,2,3,4]); 
推荐使用Array.prototype.push.apply()，因为这个方法的效率更高，但其实它与push.apply()方法的本质是一样的。
 
原文链接：https://blog.csdn.net/qq_42314621/java/article/details/89483811