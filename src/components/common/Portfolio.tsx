import React, { Component } from 'react';
import {
    Radio,
    Modal,
    Button,
    Card,
    Avatar
} from 'antd';
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined
} from '@ant-design/icons';


interface Props {
    icon: any;
    message: string;
}

export default class Portfolio extends Component {
    props: any
    constructor(props: Props) {
        super(props);
        this.props = props
        this.showModal = this.showModal.bind(this)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    state = {
        isModalVisible: false
    }

    showModal(details:any) {
        this.setState({
            isModalVisible: true
        });
    };

    handleOk() {
        this.setState({
            isModalVisible: false
        });
    };

    handleCancel() {
        this.setState({
            isModalVisible: false
        });
    };

    render() {
        return (
            <>
                <div className="action-toolbar" key="" style={{ textAlign: "center" }}>
                    <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">All</Radio.Button>
                        <Radio.Button value="b">Web Apps</Radio.Button>
                        <Radio.Button value="c">ERP</Radio.Button>
                        <Radio.Button value="d">Mobile Apps</Radio.Button>
                        <Radio.Button value="e">ERP</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="projects" key="projects" >
                    <Card onClick={()=> {this.showModal("details")}}
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>

                    <Card onClick={()=> {this.showModal("details")}}
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>

                    <Card onClick={()=> {this.showModal("details")}}
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>

                    <Card onClick={()=> {this.showModal("details")}}
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </div>

                <Modal title="Basic Modal" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }
}
