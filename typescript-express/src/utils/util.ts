// 统一包装处理返回结果

interface Result<T> {
    success: boolean;
    errMsg?: string;
    data: T;
}

export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
    if(errMsg) {
        return {
            success: false,
            errMsg,
            data
        };
    }
    return {
        success: true,
        data
    }
}