注意innerHTM必须换行书写
```
export function setStyle (direction) {
  const styleNode = document.createElement('style')
  styleNode.setAttribute('id', 'print-style')
  styleNode.setAttribute('type', 'text/css')
  styleNode.innerHTML = `
    @media print { 
        @page {
            size: A4 ${direction};
        }
    }
    `
  window.document.head.appendChild(styleNode)
}
export function removeStyle () {
  const styleNode = document.querySelector('#print-style')
  window.document.head.removeChild(styleNode)
}

```