import axios from 'axios'
import * as actionTypes from './actionTypes'


// export const getMoreList = () => {
//     return (dispatch) => {
//         axios.get('/api/home.json').then((res)=>{
//             const result = res.data.data;
//             dispatch(addHomeList(result.articleList)); // 执行非函数的action
//         }) 
//     }
// }

// const changeHomeData = (result) => ({
//     type: actionTypes.CHANGE_HOME_DATA,
//     topicList: result.topicList,
//     articleList: result.articleList,
//     recommendList: result.recommendList,
// })

export const saveMeiMeiListInfo = (titles, imgs)  => ({
    type: actionTypes.ADD_MEIMEI_LIST,
    titles,
    imgs
})