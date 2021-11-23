import React, { Component } from 'react';


interface Props {
    icon: any;
    message: string;
}

export default class NoItemSelected extends Component<Props, {}> {
    props:any
    constructor(props:Props){
        super(props);
        this.props = props
    }

    render() {
        return (
            <div style={{
                textAlign: "center",
                height: "calc(100vh - 250px)",
                color:"#d4d4d4"
            }}>
                {this.props.icon}
                <br />
                <span className="">{this.props.message}</span>
            </div>
        );
    }
}
