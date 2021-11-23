import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import {
    Layout,
} from 'antd';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import ContentBlock from './Content';

const { Content } = Layout;

export default class AppLayout extends Component {
    state = {
        collapsed: true,
        showDrawe: true,
        isDraweClosable: false,
        showTopBar: false,
        menu:[]
    }

    constructor(props:any){
        super(props)
        this.handle_UpdateMenu = this.handle_UpdateMenu.bind(this)
    }

    handle_UpdateMenu = (menu:any) => {
        this.setState({menu: menu});
    }
    componentDidUpdate(prevState:any){

    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Layout className="site-layout">
                    <Router>
                        <Topbar />
                        <Sidebar onUpdateMenu={this.handle_UpdateMenu} />
                        
                        <div style={{
                            marginLeft: (this.state.showDrawe ? 255 : 0)
                        }}>
                            <Content style={{ margin: 0, marginTop: (this.state.showTopBar ? 65 : 0) }}>
                                {/* <ScreenTitle /> */}
                                <ContentBlock menu={this.state.menu} />
                                {/* <Footer style={{ textAlign: 'center' }}>Created by <a href="mailto:harishkumarreddy.cherla@gmail.com">Harishkumar</a>.</Footer> */}
                            </Content>
                        </div>

                    </Router>
                </Layout>
            </Layout>
        );
    }
}
