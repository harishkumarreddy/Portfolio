import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import * as contentful from 'contentful-management'
import {
    Avatar,
    Drawer,
    Image,
    Typography,
    List
} from 'antd';
import { setRoutParts } from '../Store/actions/RoutActions';
import { setScreenTitle } from '../Store/actions/TitleActions';
import * as cf_conf from '../configs/contentfull.json'
import axios, { AxiosRequestConfig } from 'axios';

const { Title } = Typography;


const storeToProps = (props: any) => {
    return {
        urlParts: props.urlParts,
        title: props.title
    }
}

const propsToStore = (dispatch: any) => {
    return {
        setUrlParts: () => dispatch(setRoutParts()),
        setTitle: (title: any) => dispatch(setScreenTitle(title)),
    }
}

interface Props {
    onUpdateMenu:any;
}

class Sidebar extends Component<Props> {
    client: any
    // props: any
    state = {
        collapsed: true,
        urlParts: "/",
        showDrawe: true,
        isDraweClosable: false,
        showTopBar: false,
        name: "",
        subTitle: "",
        title: "",
        logo: "",
        assets: {},
        menu: [
            {
                title: "Home",
                icon: "/home.png",
                rout: "/",
                id:""
            }
        ],
        socialMedia: []
    };

    constructor(props: any) {
        super(props)
        this.get_baseConfigs = this.get_baseConfigs.bind(this)
        this.get_navItems = this.get_navItems.bind(this)
        this.get_socialmedia = this.get_socialmedia.bind(this)

        this.client = contentful.createClient(
            {
                accessToken: cf_conf.access_token,
            },
            {
                type: 'plain',
                defaults: {
                    spaceId: cf_conf.space,
                    environmentId: cf_conf.environment,
                },
            })
        
            this.get_baseConfigs();
            this.get_navItems()
            this.get_socialmedia()
    }

    get_baseConfigs(){
        var config: AxiosRequestConfig = {
            method: 'get',
            url: `https://cdn.contentful.com/spaces/${cf_conf.space}/environments/${cf_conf.environment}/entries?content_type=baseConfigs`,
            headers: {
                'Authorization': 'Bearer ' + cf_conf.access_token
            }
        };

        axios(config)
            .then((response: any) => {
                let assets: any = {}
                response.data['includes']['Asset'].forEach((asset: any) => {
                    assets[asset['sys']['id']] = asset['fields']
                });
                this.setState({
                    name: response.data['items'][0]['fields']['fullName'],
                    subTitle: response.data['items'][0]['fields']['subTitle'],
                    title: response.data['items'][0]['fields']['title'],
                    logo: assets[response.data['items'][0]['fields']['logo']['sys']['id']]['file']['url'],
                    assets: assets
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    get_navItems(){
        var config: AxiosRequestConfig = {
            method: 'get',
            url: `https://cdn.contentful.com/spaces/${cf_conf.space}/environments/${cf_conf.environment}/entries?content_type=navbar&order=fields.order`,
            headers: {
                'Authorization': 'Bearer ' + cf_conf.access_token
            }
        };

        axios(config)
            .then((response: any) => {
                let assets: any = {}
                response.data['includes']['Asset'].forEach((asset: any) => {
                    assets[asset['sys']['id']] = asset['fields']
                });
                let menu:any = this.state.menu;
                response.data['items'].forEach((item: any) => {
                    let page:any = []
                    page = response.data['includes']['Entry'].filter((entry:any)=>{
                        return entry['sys']['id'] === item['fields']['page']['sys']['id']
                    })
                    page= (page.length>0)? page[0]:page

                    let page_assets:any = {}
                    if(page['fields']['featureImages']){
                        page['fields']['featureImages'].forEach((asset: any) => {
                            page_assets[asset['sys']['id']] = response.data['includes']['Asset'].filter((entry:any)=>{
                                return entry['sys']['id'] === asset['sys']['id']
                            })
                        });
                    }
                    menu.push(
                        {
                            title: item['fields']['menuTitle'],
                            icon: assets[item['fields']['icon']['sys']['id']]['file']['url'],
                            rout: "/"+item['fields']['rout'],
                            id:item['fields']['page']['sys']['id'],
                            page:(page.length>0)? page[0]:page,
                            assets: page_assets
                        }
                    )
                });

                this.setState({
                    menu: menu
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
    get_socialmedia(){
        var config: AxiosRequestConfig = {
            method: 'get',
            url: `https://cdn.contentful.com/spaces/${cf_conf.space}/environments/${cf_conf.environment}/entries?content_type=socialmedia`,
            headers: {
                'Authorization': 'Bearer ' + cf_conf.access_token
            }
        };

        axios(config)
            .then((response: any) => {
                let assets: any = {}
                response.data['includes']['Asset'].forEach((asset: any) => {
                    assets[asset['sys']['id']] = asset['fields']
                });
                let menu:any = [];
                response.data['items'].forEach((item: any) => {
                    menu.push(
                        {
                            title: item['fields']['name'],
                            icon: assets[item['fields']['icon']['sys']['id']]['file']['url'],
                            rout: item['fields']['url']
                        }
                    )
                });

                this.setState({
                    socialMedia: menu
                });
                this.props.onUpdateMenu(this.state.menu)
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    componentDidMount() {
        let parts:any = (window.location.pathname.slice(1)).split("/")
        this.setState({
            urlParts: parts[0]===""? "/" : "/"+parts[0],
        });
    }

    showDrawer = () => {
        this.setState({
            showDrawe: true,
        });
    };

    onClose = () => {
        this.setState({
            showDrawe: false,
        });
    };
    navlink_onClick = (e: any) => {
        this.setState({
            urlParts: e.target.attributes.href.value,
        });
    };

    render() {
        return (
            <Drawer
                title={
                    <div>
                        <Image
                            src={this.state.logo}
                            preview={false}
                        />
                        <Title title={this.state.name} level={2}>{this.state.title}</Title>
                        <Title level={4}>{this.state.subTitle}</Title>
                    </div>
                }
                footer={
                    <div>
                        <List
                            // grid={{ gutter: 16, column:6 }}
                            dataSource={this.state.socialMedia}
                            renderItem={item => (
                                <List.Item.Meta
                                    title={false}
                                    avatar={<a title={item['title']} href={item['rout']} target="_new"><Avatar src={item['icon']} /></a>}
                                    description={false}
                                />
                            )}
                        />
                    </div>
                }
                placement="left"
                onClose={this.onClose}
                closable={this.state.isDraweClosable}
                visible={this.state.showDrawe}
                getContainer={false}
                mask={false}
                push={true}
            >
                <List
                    header={false}
                    footer={false}
                    size="large"
                    dataSource={this.state.menu}
                    renderItem={item => {
                        return <List.Item>
                            <List.Item.Meta
                                title={<Link to={item.rout} onClick={this.navlink_onClick} className={(this.state.urlParts === item.rout) ? "active" : ""}>{item.title}</Link>}
                                avatar={<Avatar src={item.icon} />}
                                description={false}
                            />
                        </List.Item>
                    }}
                />
            </Drawer>
        );
    }
}

export default connect(storeToProps, propsToStore)(Sidebar)

