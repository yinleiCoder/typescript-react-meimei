import React, { useEffect, useState } from "react";
import { Button, message, Row, Col, Divider } from "antd";
import { Redirect } from "react-router-dom";
import http from "../../axios-wrapper";
import monent from "moment";
import { connect } from 'react-redux';
import { actionCreators } from './store';
import "./style.css";



const Home = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState({});
    
    const tempIndex = 0;
    const {meimeiImgList, meimeiTitleList, saveListInfo} = props;


    useEffect(() => {
        http.get('/api/isLogin').then((res)=>{
            if(!res.data){
                setIsLogin(false);
            }
        });
        http.get('/api/showData').then((res)=> {
            if(res.data) {
                // console.log(res.data)
                setData(res.data);
            }
        });
    }, [data]);

    const handleCrowller = () => {
        http.get('/api/getData').then((res)=>{
            if(res.data){
                message.success('龟田君已为您抓取了新的一波小姐姐~');
            }else {
                message.error('二弟这次不行啦！再试试？');
            }
        });
        generateBody();
    }

    const handleLogout = () => {
        http.get('/api/logout').then((res)=>{
            if(res.data){
                setIsLogin(false);
                // localStorage.setItem('islogin', false);
            }else {
                message.error('退出失败');
            }
        })
    }

    function generateBody(){
        const times = []; 
        const {currentPage, currentPageItemsLength,totalPages,totalPagesItemsLength}  = data;
        const titles = [];
        const imgs = [];
        for(let meimeiItem in data) {
            if(meimeiItem==='currentPage' || meimeiItem==='currentPageItemsLength' || meimeiItem==='totalPages' || meimeiItem==='totalPagesItemsLength') {
                continue;
            }
            const item = data[meimeiItem];
            // console.log(meimeiItem)
            times.push(monent(Number(meimeiItem)).format('MM-DD HH:mm'));
            item.forEach(innerItem => {
                const {img, title} = innerItem;
                titles.push(title);
                imgs.push(img);
            });
        }
        // console.log(titles, imgs);
        saveListInfo(titles, imgs);
    }

    return (
        isLogin ? 
        <>
      
        <Divider orientation="left">
            那些好看的小姐姐<span>😍</span>
        </Divider>
        {
            <Row
            gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
            >
            {
                meimeiImgList.map((imgSrc, index) => {
                    return (
                        <Col 
                        key={imgSrc}
                        className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                        <div  className="meimei-container">
                            <img className="meimei-img" src={imgSrc}/>
                        </div>
                        </Col>
                    );
                    })
            }
            </Row>
            
        }
          <Divider orientation="left">
            猛男，快来操作下方按钮吧!<span>😎</span>
        </Divider>
        <Button type="primary" onClick={handleCrowller}>抓小姐姐</Button>
        <Button type="link" onClick={handleLogout}>退出</Button>
        <div>[提示：此项目现处于预览版阶段，暂不做SEO、同构等，以后将更新为Nextjs服务器端渲染并提供小姐姐视频。优化升级敬请期待！！！]</div>
        <div>我们的故事还没有结束，项目持续优化升级中，欢迎star!敬请期待，咱们下次见！</div>
        <div>Power by "TypeSciprt + React + Express"</div>
        <div>作者：初心未改的少年——尹磊</div>
        </> : <Redirect  to="/login"/>
    );
}


const mapStateToProps = (state) => ({
    meimeiImgList: state.home.meimeiImgList,
    meimeiTitleList: state.home.meimeiTitleList,
})
const mapDispatchToProps = (dispatch) => ({
    saveListInfo(titles, imgs) {
        // console.log(titles, imgs)
        dispatch(actionCreators.saveMeiMeiListInfo(titles, imgs));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);
