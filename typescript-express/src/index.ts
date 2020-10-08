import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import router from './router';
import './controller/CrowllerController';


// express 作为后端
const app = express();

// 中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use((req: Request, res: Response, next: NextFunction) => {
    req.personName = 'yinlei';
    next();
});

// 使用cookie-session
app.use(cookieSession({
    name: 'session',
    keys: ['yinleilei'],
    maxAge: 24*60*60*1000
}));

// 自定义路由模块
app.use(router); 

const port = 7001;
app.listen(7001, ()=> {
    console.log(`TS+Express is already running on the ${port} port!!!!!`);
})