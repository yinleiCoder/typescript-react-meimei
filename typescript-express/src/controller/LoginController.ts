import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller,get,post } from './decorators';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

@controller
class LoginController {


    @get('/')
    home(req: BodyRequest, res: Response) {
        const isLogin = req.session ? req.session.login : undefined;
        if(isLogin){
            res.send(`
            <html>
                <body>
                    <a href="/api/getData">爬取内容</a>
                    <a href="/api/showData">展示内容</a>
                    <a href="/api/logout">退出</a>
                </body>
            </html>
        `);
        }else {
            res.send(`
            <html>
                <body>
                    <form method="post" action="/api/login">
                        <input type="password" name="password"/>
                        <button>登录</button>
                    </form>
                </body>
            </html>
        `);
        }
    }

    @post('/api/login')
    login(req: BodyRequest, res: Response) {
        const {password} = req.body;
        const isLogin = req.session ? req.session.login : undefined;
        if(isLogin){
            res.json(getResponseData<boolean>(false,'已经登陆过！' ));
        }else {
            if(password === 'yinlei' && req.session) {
                req.session.login = true;
                res.json(getResponseData<boolean>(true));
            }else{
                res.json(getResponseData<boolean>(false, '登陆失败！'));
            }
        }
    }

    @get('/api/isLogin')
    isLogin(req: BodyRequest, res: Response) {
        const isLogin = req.session ? req.session.login : undefined;
        res.json(getResponseData<boolean>(isLogin));
    }

    @get('/api/logout')
    logout(req: BodyRequest, res: Response) {
        if( req.session) {
            req.session.login = undefined;
        }
        res.json(getResponseData<boolean>(true));
    }
}
