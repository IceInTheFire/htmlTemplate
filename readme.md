#### 说明

```
这个是普通html页面压缩的模板
平时，我们写一个简单的html页面，这个页面引入了js和css。

但是，写完后，我们的文件肯定不是压缩版本的。在服务器上就会造成很大的浪费。

我这个模板就是搭配gulp和node，实时压缩文件，生成静态文件，并处理缓存问题。
```

#### 案例地址（可看源码，清一色全是压缩文件）

http://www.yueqingfang.cn/htmlTemplate/views/

http://www.yueqingfang.cn/htmlTemplate/views/index2.html

#### 先执行这三个命令

```
yarn install   下载依赖
gulp build     生成dist文件
npm run server  开启node服务   端口9092
```

#### 简单页面压缩命令

```
gulp              	 压缩html、js、css文件	并生成版本号
gulp watch		     实时监控  html、js、css文件变化并压缩 ，并生成版本号
gulp lib			压缩  src下content/images文件夹下的所有图片，copy  src下lib,content文件夹的所有文件
gulp build			是gulp和gulp lib的集合版本。
```

#### 使用之前

```
使用这个模板可快速搭建简单页面。使简单页面项目化。

使用之前，可先把模板里的index.html页面去掉
```

