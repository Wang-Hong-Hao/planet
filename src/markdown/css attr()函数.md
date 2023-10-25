# css attr()函数

>  `attr()` 理论上能用于所有的 CSS 属性但目前支持的仅有伪元素的 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性，其他的属性和高级特性目前是实验性的

CSS 表达式 `attr()` 用来获取选择到的元素的某一 HTML 属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素。

## 语法

```css
attr( attribute-name <type-or-unit>? [, <fallback> ]? )
```

- attribute-name 是 CSS 所引用的 HTML 属性名称。

## 示例

```css
p:before {
    content:attr(data-foo) " ";
}
```

```html
<p data-foo="hello">world</p>
```

## 结果

hello world