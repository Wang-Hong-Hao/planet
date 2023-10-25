Node.js 使用 `officecrypto-tool` 读取加密的 Excel (xls, xlsx) 和 Word( docx)文档, 还支持 xlsx 和 docx 文件的加密（具体使用看文档）。暂时不支持 doc 文件的解密

传送门：[officecrypto-tool](https://www.npmjs.com/package/officecrypto-tool)

读取加密的 Excel 示例

```
一：xlsx-populate 
// 只支持 xlsx ，xlsx-populate  自带了解密功能，
// 不过只支持 ecma376 agile 模式，也就是 Office 生成的加密的 docx ，
// WPS 的就不行，WPS 用的是 ecma376 standard 模式
const XlsxPopulate = require('xlsx-populate');
(async ()=>{
    const input = await fs.readFile(`pass_test.xlsx`);
    const output = await officeCrypto.decrypt(input, {password: '123456'});
    const workbook = await XlsxPopulate.fromDataAsync(output);

    // 或者可先判断文件是否是加密的
    const isEncrypted = officeCrypto.isEncrypted(input);
    let output = input;
    if (isEncrypted) {
        output = await officeCrypto.decrypt(input, {password: '123456'});
    }
    const workbook = await XlsxPopulate.fromDataAsync(output);
 })()


二：@zurmokeeper/exceljs https://www.npmjs.com/package/@zurmokeeper/exceljs

// 只支持 xlsx @zurmokeeper/exceljs 直接内置了解密功能，完全兼容 exceljs v4.3.0
const Excel = require('@zurmokeeper/exceljs');
(async ()=>{
    // 从文件读取, 解密使用密码加密的 excel 文件
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(filename, {password:'123456'});

    // 从流读取, 解密使用密码加密的 excel 文件
    const workbook = new Excel.Workbook();
    await workbook.xlsx.read(stream, {password:'123456'});

    // 从 buffer 加载, 解密使用密码加密的 excel 文件
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(data, {password:'123456'});
})()

三：xlsx
// xlsx 支持 xls 和 xlsx
const XLSX = require('xlsx');
(async ()=>{
    const input = await fs.readFile(`pass_test.xlsx`);
    // const input = await fs.readFile(`pass_test.xls`); // 或者 xls
    const output = await officeCrypto.decrypt(input, {password: '123456'});
    const workbook = XLSX.read(output);

    // 或者可先判断文件是否是加密的
    const isEncrypted = officeCrypto.isEncrypted(input);
    let output = input;
    if (isEncrypted) {
        output = await officeCrypto.decrypt(input, {password: '123456'});
    }
    const workbook = XLSX.read(output);
})()

四：node-xlsx
// 其实 node-xlsx 只是对 xlsx 进行了封装，里面还是调用 xlsx 去解析的
const nodeXlsx = require('node-xlsx');
(async ()=>{
    const input = await fs.readFile(`pass_test.xlsx`);
    // const input = await fs.readFile(`pass_test.xls`); // 或者 xls
    const output = await officeCrypto.decrypt(input, {password: '123456'});
    const workbook = nodeXlsx.parse(output);

    // 或者可先判断文件是否是加密的
    const isEncrypted = officeCrypto.isEncrypted(input);
    let output = input;
    if (isEncrypted) {
        output = await officeCrypto.decrypt(input, {password: '123456'});
    }
    const workbook = nodeXlsx.parse(output);
})()
```

读取加密的 Word 示例

使用：[mammoth](https://www.npmjs.com/package/mammoth) [officecrypto-tool](https://www.npmjs.com/package/officecrypto-tool)

```
const officeCrypto = require('officecrypto-tool');
const fs = require('fs').promises;
const mammoth = require('mammoth');
(async ()=>{
    const input = await fs.readFile(`pass_test.xlsx`);
    const output = await officeCrypto.decrypt(input, {password: '123456'});
    await mammoth.convertToHtml({buffer: output});

    // 或者可先判断文件是否是加密的
    const isEncrypted = officeCrypto.isEncrypted(input);
    let output = input;
    if (isEncrypted) {
        output = await officeCrypto.decrypt(input, {password: '123456'});
    }
    await mammoth.convertToHtml({buffer: output});
})()
```

使用其他的 word 读取库也是一样的道理，先使用 officecrypto-tool 解密以后再用对应的库去处理