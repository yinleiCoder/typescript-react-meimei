import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller,get,use } from './decorators';
import { getResponseData } from '../utils/util';
import fs from 'fs';
import path from 'path';

interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined;
    }
}

// 中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        next();
    } else {
        res.json(getResponseData(null, '请先登录'));
    }
}


@controller
class CrowllerController {
    
    @get('/api/getData') 
    @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        res.json(getResponseData<boolean>(true));
    }

    @get('/')
    test(req: BodyRequest, res: Response) {
        res.send(`
        <html>
            <body>
                test
            </body>
        </html>
    `);
    }

}