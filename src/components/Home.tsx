import React, { Component } from 'react';
import {
    Image,
} from 'antd';
import * as contentful from 'contentful-management'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import * as cf_conf from '../configs/contentfull.json'
import axios, { AxiosRequestConfig } from 'axios'

export default class Home extends Component {
    state = {
        title: "Harishkumar",
        subTitle: "Developper",
        blocks: {
            name_block:"",
            title_block:"",
            image_block:"",
        }
    }

    client: any
    constructor(props: any) {
        super(props)
        this.get_blocks = this.get_blocks.bind(this)

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
        
            this.get_blocks();
    }

    get_blocks(){
        var config: AxiosRequestConfig = {
            method: 'get',
            url: `https://cdn.contentful.com/spaces/${cf_conf.space}/environments/${cf_conf.environment}/entries?content_type=homePageBlocks`,
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
                let blocks:any = {};
                response.data['items'].forEach((item: any) => {
                    if(item['fields']['block'] === "Image Block"){
                        blocks[item['fields']['block'].toLocaleLowerCase().replaceAll(" ", "_")] = assets[item['fields']['blockContent']['content'][0]['data']['target']['sys']['id']]['file']['url']
                    }else{
                        blocks[item['fields']['block'].toLocaleLowerCase().replaceAll(" ", "_")] = documentToHtmlString(item['fields']['blockContent']).replaceAll("<h2>", "<h2 class='ant-typography'>").replaceAll("<h4>", "<h4 class='ant-typography'>").replaceAll("<h5>", "<h5 class='ant-typography'>")
                    }
                });

                this.setState({
                    blocks: blocks
                });
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <div className="home-topcasced" dangerouslySetInnerHTML={{__html: this.state.blocks.name_block}} ></div>
                <div className="home-bottomcasced" dangerouslySetInnerHTML={{__html: this.state.blocks.title_block}}></div>
                <div className="home-imagecasced">
                    <Image src={this.state.blocks.image_block} />
                </div>
            </div>
        );
    }
}
