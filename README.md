# TypeScript爬虫+React开发"小姐姐美图"网站:girl:


### 启航：

这是一个什么网站？

俗话说，兴趣才是开发的动力。

作为一个男生(lsp)，看异性的美图是人之常情。

于是我发起了这个项目，采用当前最流行的技术栈，并计划在以后的空余时间进行项目升级。

本项目的雏形为：

- TypeScript作为爬虫、Express为后端
- React作为前端展示
- OAuth授权登录

未来还可能加入GitHub Actions 进行CI/CD。也可能使用腾讯云的serveless云服务等。

说明：
- typescript-express是后端+爬虫。启动命令是进入该文件夹并yarn dev，就会并行执行tsc-w和nodemon.这会产生冲突，所以package.json里配置了nodemonConfig。


如果您对这个项目感兴趣，请为我点个star，感谢！:thermometer:

如果你fork代码遇到问题请提交issue！

## created by: 尹磊:boy:

### 效果图：

![1](https://github.com/yinleiCoder/typescript-react-meimei/blob/main/doc/1.png)

![2](https://github.com/yinleiCoder/typescript-react-meimei/blob/main/doc/2.png)

![3](https://github.com/yinleiCoder/typescript-react-meimei/blob/main/doc/3.png)

![4](https://github.com/yinleiCoder/typescript-react-meimei/blob/main/doc/4.png)

网页截屏技巧：
1.在要截图的网页，按下F12，进入开发者工具
2.按下Ctrl + Shift + P
3.输入Capture full size screenshot指令（可以只输入几个字符），按下回车键，就ok了
# 运行方法：

克隆项目到本地，先yarn安装依赖，然后进入后端文件夹yarn dev启动后端，最后进入react前端文件夹yarn start启动前端即可。
