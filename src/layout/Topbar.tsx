import React, { Component} from 'react';
import { Layout, Menu} from 'antd';

const { Header} = Layout;

export default class Topbar extends Component {
    state = {
        collapsed: true,
    };


    
    render() {
        return (
            <Header className="site-layout-background" style={{ 
                padding: "0 10px", 
                position: 'fixed', 
                zIndex: 1, 
                width: "100%", 
                borderBottom: "solid 1px #00000047",
                display:'none'
                }}>
                <div className="logo" />
                <Menu theme="light" className="" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
        );
    }
}
