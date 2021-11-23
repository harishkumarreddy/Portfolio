import React, { Component } from 'react';
import { Breadcrumb, Col, Row } from 'antd';
import { connect } from 'react-redux';
import { setScreenTitle } from '../Store/actions/TitleActions';

const storeToProps = (props: any) => {
    return {
        title: props.title,
        urlParts: props.urlParts.urlParts,
    }
}

class ScreenTitle extends Component {
    props: any
    state = {
        title: "",
        urlParts: []
    }

    constructor(props: any) {
        super(props);
        this.props = props
        this.checkTitle = this.checkTitle.bind(this)
    }

    componentDidUpdate() {
        if (this.state.title !== this.props.title)
            this.setState({
                title: this.props.title,
                urlParts: this.props.urlParts
            })

    }

    componentDidMount() {
        this.setState({
            title: this.props.title,
            urlParts: this.props.urlParts
        })
    }

    checkTitle(title: any) {
        if (typeof title === "object")
            title = title.title
        if (title === "") {
            return "Dashboard"
        }
        if (title.toLowerCase() === "db") {
            return "Database"
        }

        let titl_parts = title.split("-")
        if (title.length === 0) {
            titl_parts = title.split("_")
        }
        titl_parts.forEach((e: any, i: number) => {
            console.log(e)
            titl_parts[i] = e[0].toUpperCase() + e.slice(1)
        });
        return titl_parts.join(" ")
    }

    render() {
        return (
            <Row style={{
                position: "fixed",
                width: "calc(100% - 80px)",
                margin: '0',
                padding: "14px 10px 10px 12px",
                boxShadow: "0 0.1em 0.5em #00000047",
                backgroundColor: "#ececee"
            }}>
                <Col key="1" span="8"><h3 style={{ margin: 0, textTransform: "capitalize" }}>{this.checkTitle(this.state.title)}</h3></Col>
                <Col key="2" span="16" style={{ textAlign: "right" }}>
                    <Breadcrumb separator=">" >
                        <Breadcrumb.Item key="HOME" >Home</Breadcrumb.Item>

                        {console.log(this.state)}
                        {
                            this.state.urlParts.map(item => <Breadcrumb.Item key="{item}">{item}</Breadcrumb.Item>)
                        }
                    </Breadcrumb>
                </Col>
            </Row>
        );
    }
}

export default connect(storeToProps)(ScreenTitle)