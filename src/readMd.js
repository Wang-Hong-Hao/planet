const fs = require('fs')
const path = require('path')
const marked = require('marked')

// 定义要读取的Markdown文件夹路径
const markdownDirectory = __dirname + '/markdown'

// 创建一个空数组来存储Markdown文件的内容
const markdownData = []
// 读取Markdown文件夹中的文件
const files = fs.readdirSync(markdownDirectory)
// 遍历每个Markdown文件
files.forEach((file) => {
  const filePath = path.join(markdownDirectory, file)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  // 使用marked库将Markdown解析为HTML
  const htmlContent = marked.parse(fileContent)
  // 将文件名和解析后的HTML内容添加到数组中
  markdownData.push({
    fileName: file,
    content: htmlContent,
  })
})
const writePath = path.join(__dirname, '/blog/blog.json')
const folderName = path.join(__dirname, '/blog')
// 创建目录
fs.mkdir(folderName, (err) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.log(`文件夹 "${folderName}" 已经存在。`)
    } else {
      console.error('创建文件夹时发生错误:', err)
    }
  } else {
    console.log(`📁📁📁文件夹 "${folderName}" 创建成功。📁📁📁`)
  }
})
// 写入JSON文件
const jsonData = JSON.stringify(markdownData)
fs.writeFile(writePath, jsonData, (err) => {
  if (err) {
    console.error('无法写入JSON文件：', err)
    return
  }
  console.log('📄📄📄JSON文件已生成：blog.json📄📄📄')
})
