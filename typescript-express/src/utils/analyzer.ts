import fs from 'fs';
import { MyAnalyer } from './crollwer';
import cheerio from 'cheerio'; // cheerio进行数据提取

interface MeiMei {
    title: string;
    img: string;
}

interface MeiMeiResult {
    time: number;
    currentPage: number; // 当前页码
    currentPageItemsLength: number; // 当前页的条数
    totalPages: number; // 总共页码
    totalPagesItemsLength: number; // 总共条数
    data: MeiMei[];
}

interface Content {
    currentPage: number; // 当前页码
    currentPageItemsLength: number; // 当前页的条数
    totalPages: number; // 总共页码
    totalPagesItemsLength: number; // 总共条数
    [propName: number]: MeiMei[];
}


class Analyzer implements MyAnalyer {

    // 单例模式:
    private static instance: Analyzer;
    static getInstance() {
        if(!Analyzer.instance){
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance;
    }
    private constructor() {}

    // 提取html里需要的信息
    private parseHtmlToJsonInfo(html: string): MeiMeiResult {
        // if(html.includes('charset=gb2312')) {
        //     html = html.replace('charset=gb2312', 'charset=utf-8',);
        // }
        const $ = cheerio.load(html, {decodeEntities: false}); // 解决中文编码
        const meimeiItems = $('.list_con.bgff .list_con_box_ul li');
        const currentPageItemsLength = meimeiItems.length;
        const meimeiInfos: MeiMei[] = [];
        const totalPages  = parseInt($('.pages .pageinfo strong').eq(0).text(),10);
        const totalPagesItemsLength  = parseInt($('.pages .pageinfo strong').eq(1).text(),10);
        meimeiItems.map((index, element) => {
            const img = $(element).find('img').attr('src') as string;
            const title = $(element).find('label').eq(0).text();
            // console.log(img, title)
            meimeiInfos.push({ img, title }); // currentPage由外面传进来
        });
        return {
            time: (new Date()).getTime(),
            currentPage: 1,
            currentPageItemsLength,
            totalPages,
            totalPagesItemsLength,
            data: meimeiInfos,
        }
    }

    private generateJsonContent(meimeiInfo: MeiMeiResult, filePath: string) {
        const {currentPage, currentPageItemsLength, totalPages, totalPagesItemsLength, data} = meimeiInfo;
        let fileContent: Content = {
            currentPage,
            currentPageItemsLength,
            totalPages,
            totalPagesItemsLength,
        };
        if(fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        fileContent[meimeiInfo.time] = data;
        return fileContent;
    }

    public analyze(html: string, filePath: string) {
        const meimeiInfo = this.parseHtmlToJsonInfo(html);
        // console.log(meimeiInfo)
        const fileContent = this.generateJsonContent(meimeiInfo, filePath);
        // console.log(fileContent)
        return JSON.stringify(fileContent, null, 2);
    }

    

}

export default Analyzer;