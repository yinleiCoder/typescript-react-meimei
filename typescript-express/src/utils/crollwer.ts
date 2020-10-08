import path from 'path';
import fs from 'fs';
import superagent from 'superagent';// superagent获取html页面内容

import Analyzer from './analyzer';

export interface MyAnalyer {
    analyze: (html: string, filePath: string) => string;
}

class Crowller {
    
    private filePath = path.resolve(__dirname, '../../data/meimei.json');

    constructor(private url: string, private analyzer: MyAnalyer) {
        this.initSpiderProcess();
    }

    private async initSpiderProcess() {
        const html = await this.getRawHtml();
        const fileContent = this.analyzer.analyze(html, this.filePath);
        // console.log(fileContent)
        this.writeFile(fileContent);
    }

    private async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text;
    }

    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content);
    }

}

export default Crowller;