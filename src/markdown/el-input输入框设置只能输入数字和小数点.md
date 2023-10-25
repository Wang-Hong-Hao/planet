`οnkeyup="value=value.replace(/[^\d]/g,'')"`
```
          <el-input v-model="" oninput="value=value.replace(/[^\d\.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')"></el-input>

```