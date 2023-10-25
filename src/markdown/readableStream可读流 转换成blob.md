```
import * as binconv from 'binconv'
// 将readableStream 转换成blob
const blob = await binconv.readableStreamToBlob(fileData.Body)
```