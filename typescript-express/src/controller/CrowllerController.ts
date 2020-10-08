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

interface MeiMei {
    title: string;
    img: string;
}
interface Content {
    currentPage: number; // 当前页码
    currentPageItemsLength: number; // 当前页的条数
    totalPages: number; // 总共页码
    totalPagesItemsLength: number; // 总共条数
    [propName: number]: MeiMei[];
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
        // const currentCrowllerPageIndex = req.session ? req.session.currentCrowllerPageIndex : undefined;
        // if(!currentCrowllerPageIndex) {
        //     req.session.currentCrowllerPageIndex = 1;
        // }
        const url = `https://www.tupianzj.com/meinv/yishu/list_178_${1}.html` // 要爬取网站的URL
        const analyzer = Analyzer.getInstance();
        new Crowller(url, analyzer);
        res.json(getResponseData<boolean>(true));
    }

    @get('/api/showData')
    // @use(checkLogin)
    showData(req: BodyRequest, res: Response) {
        try {
            const position = path.resolve(__dirname, '../../data/meimei.json');
            const result = fs.readFileSync(position, 'utf-8');
            res.json(getResponseData<Content>(JSON.parse(result)));
        } catch (e) {
            res.json(getResponseData<boolean>(false, '数据不存在'));
        }
    }

}