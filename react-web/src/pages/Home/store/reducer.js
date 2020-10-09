import * as actionTypes from './actionTypes';

const defaultState = {
    meimeiImgList: [],
    meimeiTitleList: [],
}

export default (state=defaultState, action) => {
    switch(action.type){
        case actionTypes.ADD_MEIMEI_LIST:
            const newState = JSON.parse(JSON.stringify(state));// 深拷贝

            const imgs =  action.imgs
            const titles =  action.titles
            console.log(imgs.length)
            newState.meimeiImgList = Array.from(new Set(imgs));
            console.log(newState.meimeiImgList.length)
            newState.meimeiTitleList= Array.from(new Set(titles));
            return newState;
        default:
            return state;
    }
}