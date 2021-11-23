import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Result } from 'antd';
import Page from '../components/Page';
import Home from '../components/Home';

interface Props {
    menu:any;
}
export default class ContentBlock extends Component<Props> {
    state = {
        menu:[]
    }
    componentDidMount(){
        this.setState({
            menu: this.props.menu
        })
    }
    componentDidUpdate(){
        if(((this.props.menu.length>0) && this.state.menu.length ===0) || (JSON.stringify(this.state.menu) !== JSON.stringify(this.props.menu))){
            this.setState({
                menu: this.props.menu
            })
        }
    }
    render() {
        return (
            <div className="site-layout-background" style={{
                // padding: 6,
                margin: 10,
                boxShadow: "0 0 5px #a2a2a2",
                borderRadius: 5,
                minHeight: "calc(100vh - 50px)",
                maxHeight: "calc(100vh - 50px)",
                height: "calc(100vh - 50px)",
                overflow: "auto"
            }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:page" component={(props:any)=> <Page {...props} menu={this.state.menu} />} />
                    {/* <Route exact path="/:page">
                        <Page page_id="" />
                    </Route> */}
                    <Route>
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                        />,
                    </Route>
                </Switch>
            </div>
        );
    }
}
