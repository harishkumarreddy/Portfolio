import React, { Component} from 'react';
import './App.css';
import AppLayout from './layout/Layout';

export default class App extends Component {
  state = {
    collapsed: true,
  };

  // constructor(props: any) {
  //   super(props);
  //   // this.setState({ collapsed: true });
  // }

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <AppLayout />
    );
  }
}
