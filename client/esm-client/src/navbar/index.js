import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import { Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Navbar.css";



class Navbar extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log(this.props.userInfo);

    return (
      <nav className="menuBar">
        <div className="logo">
          <Link >🎓 EMS</Link>
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn"></span>
          </Button>
          <Drawer
            title="Menu"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu role={this.props} />
          </Drawer>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
  };
};
export default connect(mapStateToProps, null)(Navbar);
