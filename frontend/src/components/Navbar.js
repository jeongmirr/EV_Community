import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    return (
        <div style={{ background: '#FFFFFF', textAlign: 'center'}}>

        <Link to="/">
            <img src="./image/title.png" alt="title" style={{ width: "300px", margin: '0 auto' }}/>
        </Link>
        
        <Header>
            <Menu theme="dark" mode="horizontal" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px", width: '30%' }}>
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/KaKaoMap">충전소</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/Subsidy">보조금</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/Board">게시판</Link>
                        </Menu.Item>
                    </Menu>
                    <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px", width: '100px' }}>
                        <Menu.Item key="5">
                            <Link to="/login">로그인</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </Menu>
        </Header>
            </div>
    );
};

export default Navbar;
