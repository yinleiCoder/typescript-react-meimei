import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import { controller,get,use } from './decorators';
import { getResponseData } from '../utils/util';
import fs from 'fs';
import path from 'path';

import Crowller from '../utils/crollwer';
import Analyzer from '../utils/analyzer';

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
    // @use(checkLogin)
    getData(req: BodyRequest, res: Response) {
        const url = `https://www.tupianzj.com/meinv/yishu/list_178_1.html` // 要爬取网站的URL
        const analyzer = Analyzer.getInstance();
        new Crowller(url, analyzer);
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