```
function CompareDate(t1,t2)
{
var date = new Date();
var a = t1.split(":");
var b = t2.split(":");
return date.setHours(a[0],a[1]) > date.setHours(b[0],b[1]);
}

console.log(CompareDate("11:16","11:15") )
```