import { Empty, Progress, Result } from 'antd';
import React, { Component } from 'react';
import {
    Image,
    Row, 
    Col,
    Divider
} from 'antd';
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import * as cf_conf from '../configs/contentfull.json'
import axios, { AxiosRequestConfig } from 'axios';
import Portfolio from "../components/common/Portfolio"

interface Props {
    menu: any
    match: any
}
export default class Page extends Component<Props> {

    state = {
        menu: [],
        has_404: false,
        page_content: "",
        page_title: "",
        feature_images: "",
        technical_skills: [],
        functional_skills: [],
        knowledge: [],
        frameworks:[]
    }
    renderOptions: any = { }

    constructor(props: any) {
        super(props)
        this.get_pageContent = this.get_pageContent.bind(this)
        this.get_skillsets = this.get_skillsets.bind(this)
        this.renderOptions = {
            renderNode: {
                [INLINES.EMBEDDED_ENTRY]: (node: any, children: any) => {
                    // target the contentType of the EMBEDDED_ENTRY to display as you need
                    if (node.data.target.sys.contentType.sys.id === "blogPost") {
                        return (
                            <a href={`/blog/${node.data.target.fields.slug}`}>            {node.data.target.fields.title}
                            </a>
                        );
                    }
                },
                [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
                    // target the contentType of the EMBEDDED_ENTRY to display as you need
                    if (node.data.target.sys.contentType.sys.id === "codeBlock") {
                        return (
                            <pre>
                                <code>{node.data.target.fields.code}</code>
                            </pre>
                        );
                    }

                    if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
                        return (
                            <iframe
                                src={node.data.target.fields.embedUrl}
                                height="100%"
                                width="100%"
                                frameBorder="0"
                                scrolling="no"
                                title={node.data.target.fields.title}
                                allowFullScreen={true}
                            />
                        );
                    }
                },

                [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
                    // render the EMBEDDED_ASSET as you need
                    return (
                        <img
                            src={`https://${node.data.target.fields.file.url}`}
                            height={node.data.target.fields.file.details.image.height}
                            width={node.data.target.fields.file.details.image.width}
                            alt={node.data.target.fields.description}
                        />
                    );
                },
            },
        };
    }
    componentDidMount() {
        if (this.props.menu.length > 0) {
            this.setState({
                menu: this.props.menu
            })
        }

        let pageData = this.props.menu.filter((page: any) => page['rout'] === this.props.match.url)

        if (pageData.length === 0) {
            this.setState({
                has_404: true
            })
        } else {
            this.setState({
                has_404: false
            })

            this.get_pageContent(pageData[0])
            if(this.props.match.url === "/skills"){
                this.get_skillsets()
            }
        }
    }

    componentDidUpdate(prevProps: any) {
        let pageData = this.state.menu.filter((page) => page['rout'] === this.props.match.url)

        if (pageData.length === 0) {
            if (!this.state.has_404) {
                this.setState({
                    has_404: true
                })
            }
        } else {
            if (this.state.has_404) {
                this.setState({
                    has_404: false
                })
            }
            if (prevProps.match.url !== this.props.match.url) {
                this.get_pageContent(pageData[0])
                if(this.props.match.url === "/skills"){
                    this.get_skillsets()
                }
            }
        }

    }

    get_pageContent(response: any) {
        this.setState({
            page_title: response['title'],
            page_content: (response['page']['fields']['pageContent']) ? documentToReactComponents(response['page']['fields']['pageContent'], this.renderOptions) :"", // <Empty />,
            feature_images: Object.values(response['assets']).map((asset: any) => {
                return <Image key={asset[0]['fields']['file']['name']} width={100} src={asset[0]['fields']['file']['url']} />
            })
        });
    }

    get_skillsets() {
        var config: AxiosRequestConfig = {
            method: 'get',
            url: `https://cdn.contentful.com/spaces/${cf_conf.space}/environments/${cf_conf.environment}/entries?content_type=skillSets`,
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

                let groups: any = {}
                response.data['includes']['Entry'].forEach((skil: any) => {
                    groups[skil['sys']['id']] = skil['fields']['skill']
                });
                console.log(groups)
                
                let skills: any = {}
                response.data['items'].forEach((skil: any) => {
                    if(!skills[groups[skil['fields']['skillGroup']["sys"]['id']]]){
                        skills[groups[skil['fields']['skillGroup']["sys"]['id']]] = []
                    }
                    skills[groups[skil['fields']['skillGroup']["sys"]['id']]].push(
                        {
                            "skill": skil['fields']['skill'],
                            "rating": skil['fields']['rating']
                        }
                    )
                });
                
                this.setState({
                    technical_skills: (skills["Technical Skills"])? skills["Technical Skills"] :[],
                    functional_skills: (skills["Functional Skills"])? skills["Functional Skills"] :[],
                    knowledge: (skills["Knowledge"])? skills["Knowledge"] :[],
                    frameworks:(skills["Frameworks"])? skills["Frameworks"] :[]
                })
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
    render() {
        // let page = this.props.match.params.page
        return (
            <div>
                {this.state.has_404 ?
                    <Result
                        status="404"
                        title="404"
                        subTitle="Sorry, the page you visited does not exist."
                    /> :
                    // <div className="hpage-content" dangerouslySetInnerHTML={{ __html: this.state.page_content }}></div>
                    <div className="hpage-content">
                        <Title key={this.state.page_title}>{this.state.page_title}</Title>
                        <div className="feature-images" key="feature-images">
                            <Image.PreviewGroup  key={this.state.page_title}>
                                {this.state.feature_images}
                            </Image.PreviewGroup>
                        </div>
                        <div className="content" key="content">
                            {this.state.page_content}
                        </div>
                        {
                            (this.props.match.url === "/portfolio") ? <div className="portfolio" key="portfolio"><Portfolio /></div> : ""
                        }

                        {
                            (this.props.match.url === "/skills") ? <div className="skillsets" key="skillsets">
                                    <Row>
                                        {
                                            (this.state.technical_skills.length >0)?<Col span={24}>
                                            <Title level={4}>Technical Skills:</Title>
                                            <Row wrap={true}>
                                            {
                                                this.state.technical_skills.map((skill)=>{
                                                    return <Col span={3} key={skill['skill']} style={{textAlign:"center"}}>
                                                        <Progress type="dashboard" percent={skill['rating']*10} status="active" strokeColor={{
                                                            '100%': '#108ee9',
                                                            '0%': '#87d068',
                                                        }}/>
                                                        <div  style={{textAlign:"center"}}><strong>{skill['skill']}</strong></div>
                                                    </Col>
                                                })
                                            }
                                            </Row>
                                        </Col> : ""
                                        }
                                        <Divider orientation="left" plain />
                                        {
                                            (this.state.functional_skills.length >0)?<Col span={24}>
                                            <Title level={4}>Functional Skills:</Title>
                                            <Row wrap={true}>
                                            {
                                                this.state.functional_skills.map((skill)=>{
                                                    return <Col span={3} key={skill['skill']} style={{textAlign:"center"}}>
                                                        <Progress type="dashboard" percent={skill['rating']*10} status="active"  strokeColor={{
                                                            '100%': '#108ee9',
                                                            '0%': '#87d068',
                                                        }}/>
                                                        <div  style={{textAlign:"center"}}><strong>{skill['skill']}</strong></div>
                                                    </Col>
                                                })
                                            }
                                            </Row>
                                        </Col> : ""
                                        }
                                        <Divider orientation="left" plain />
                                        {
                                            (this.state.frameworks.length >0)?<Col span={24}>
                                            <Title level={4}>Frameworks:</Title>
                                            <Row wrap={true}>
                                            {
                                                this.state.frameworks.map((skill)=>{
                                                    return <Col key={skill['skill']} span={3} style={{textAlign:"center"}}>
                                                        <Progress type="dashboard" percent={skill['rating']*10} status="active"  strokeColor={{
                                                            '100%': '#108ee9',
                                                            '0%': '#87d068',
                                                        }}/>
                                                        <div  style={{textAlign:"center"}}><strong>{skill['skill']}</strong></div>
                                                    </Col>
                                                })
                                            }
                                            </Row>
                                        </Col> : ""
                                        }
                                        <Divider orientation="left" plain />
                                        {
                                            (this.state.knowledge.length >0)?<Col span={24}>
                                            <Title level={4}>Knowledge:</Title>
                                            <Row wrap={true}>
                                            {
                                                this.state.knowledge.map((skill)=>{
                                                    return <Col span={6} key={skill['skill']} style={{textAlign:"center"}}>
                                                        <div>
                                                            <ArrowRightOutlined style={{marginRight:10, color:"#108ee9" }} />
                                                            <strong>{skill['skill']}</strong>
                                                            </div>
                                                    </Col>
                                                })
                                            }
                                            </Row>
                                        </Col> : ""
                                        }
                                    </Row>
                    
                                </div>
                                : ""
                        }
                    </div>
                }
            </div>
        );
    }
}
