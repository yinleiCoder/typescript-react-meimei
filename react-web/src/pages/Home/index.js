import React, { useEffect, useState } from "react";
import { Button, message, Row, Col, Divider } from "antd";
import { Redirect } from "react-router-dom";
import http from "../../axios-wrapper";
import monent from "moment";

const style = { background: '#0092ff', padding: '8px 0' };
function Home(props) {
    return (
        <>
        <Divider orientation="left">
            那些好看的小姐姐<span>😍</span>
        </Divider>
        <Row
            gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
        >
            <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
            <div style={style}>啊</div>
            </Col>
            <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
            <div style={style}>哦</div>
            </Col>
            <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
            <div style={style}>哎</div>
            </Col>
            <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
            <div style={style}>嘿</div>
            </Col>
        </Row>
        </>
    );
}

export default Home;
