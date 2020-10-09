import React ,{ useEffect,useState, useCallback } from "react";
import http from "../../axios-wrapper";
import { Form, Input, Button, message } from "antd";
import qs from 'qs';
import { LockOutlined } from "@ant-design/icons";
import { Redirect } from 'react-router-dom';
import "./style.css";

function Login() {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=> {
        // if(localStorage.getItem('islogin')) {
        //     setIsLogin(true);
        // }
        message.info('不要搞黄色哦!');
        return () => {
            message.info('欢迎观众老爷观看！！!');
        }
    }, []);

    const onFinish = (values) => {
        // console.log("Received values of form: ", values.password);
        http.post('/api/login', qs.stringify({
            password: values.password
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((res)=> {
            if(res.data) {
                setIsLogin(true);
                localStorage.setItem('islogin',  true);
            }else {
                message.error('登录失败');
            }
        })
    };

    return (
        isLogin ? <Redirect to="/" /> :
        <div className="login-page">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                name="password"
                rules={[
                    {
                    required: true,
                    message: "请输入登录密码",
                    },
                ]}
                >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
                </Form.Item>

                <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    登陆才可以看美女哦！
                </Button>
                </Form.Item>
            </Form>
        </div>
    );

}

export default Login;