
# 相关技术

## Backbone & Underscore

>1. http://www.css88.com/doc/underscore/
>1. http://www.css88.com/doc/backbone/

## 页面访问地址

## 线上地址

## 开发目录结构

~~~
refactor
├── css --------------------------- 第三方库&组件库样式文件(不做修改)
│   └── normalize.css
├── images  ---------------------------图片资源
│   ├── test1.png
│   └── test2.png
│   └── test3.png
├── apps  ---------------------------js功能文件
│   ├── helper ---------------------------工具函数库
│   │   ├── util.js
│   ├── data --------------------------- 测试模拟数据
│   │   └── data.json
│   ├── less --------------------------- 页面自定义样式
│   │   ├── common ---- 通用less
│   │   └── home ---- 页面级less
│   │   └── home.less ---- 页面less入口(@import导入)
│   ├── vendors --------------------------- js组件&第三方库
│   ├── home.js --------------------------- js主入口
│   └── page ------------------------------ 页面模块
│        ├── collection ---------------------------数据集合
│        ├── controller ---------------------------控制器
│        ├── model --------------------------- 数据模型
│        ├── tmpl --------------------------- 模板文件
│        └── view --------------------------- 视图
├── build --------------------------- webpack构建配置文件
│   └── webpack.base.people.js
├── fonts --------------------------- 字体文件夹
│ 
├── images --------------------------- 图片资源文件夹
│ 
└── templates --------------------------- 页面模板
~~~

# 初始化依赖

```shell
npm install
```

# 开发
windows:
```shell
sh afast.sh win 
```

mac/linux
```shell
sh afast.sh
```

# 打包
windows:
```shell
sh afast.sh win build  
```
mac/linux
```shell
sh afast.sh build
```


# 发布
* git push origin master


# handlebars
https://github.com/pcardune/handlebars-loader

# 域名地址

windows环境变量：
"scripts": {
    "dev": "set NODE_ENV=development&set MOD=kehai&webpack-dev-server  --progress --hot",
    "build": "set NODE_ENV=production&set MOD=kehai&gulp default"
},


# FAQ

