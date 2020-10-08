// 通过装饰器封装controller等
import { RequestHandler, Router } from 'express';
import { getResponseData } from '../utils/util';
// 包装路由
import router from '../router';

enum Methods {
    get = 'get',
    post = 'post',
}

// 装饰器封装controller上的metadata
function getRequestDecorator(type: Methods) {
    return function(path: string) {
        return function(target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        }
    }
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);

// 装饰器封装中间件
export function use(middleware: RequestHandler) {
    return function(target: any, key: string) {
        const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];// 因为中间件不只可以用1个
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key);
    }
}


// 装饰器封装express的router: 类似于java的springboot的router注解
export function controller(target: new (...args: any[]) => any) {
    for(let key in target.prototype) {
        // 获取router定义的metadata
        const path: string = Reflect.getMetadata('path', target.prototype, key);
        const method: Methods = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key]; // 具体router的方法体
        const middlewares: RequestHandler[] =  Reflect.getMetadata('middlewares', target.prototype, key);
        if(path && method && handler) {
            if(middlewares && middlewares.length) {
                router[method](path,...middlewares, handler);
            } else {
                router[method](path, handler); // 执行具体的router
            }
        }
    }
}


