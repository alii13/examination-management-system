import React, { useState, useEffect } from "react";
import { Menu, Grid } from "antd";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = (props) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    setisAuthenticated(props.isAuthenticated);
  }, [props]);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("profileID");
    props.signOut();
  };

  const handleProfile = () => {};

  const { md } = useBreakpoint();
  const homeRoute = isAuthenticated ? "/" : "signin";
  const testRoute = isAuthenticated ? "/attempt-test" : "signup";
  const resultRoute = isAuthenticated ? "/result" : "";
  const signOutRoute = isAuthenticated ? "/signin" : "";
  const profileRoute = isAuthenticated ? "/profile" : "";

  return (
    <div className="menu">
      <Menu mode={md ? "horizontal" : "inline"}>
        <Menu.Item key="01">
          <NavLink to={homeRoute}>
            {isAuthenticated ? "Home" : "Sign In"}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="02">
          <NavLink to={testRoute}>
            {isAuthenticated ? "Attempt Test" : "SignUp"}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="03" className={!isAuthenticated ? "display-none" : ""}>
          <NavLink to={resultRoute}>{isAuthenticated ? "Result" : ""}</NavLink>
        </Menu.Item>
        <Menu.Item key="05" className={!isAuthenticated ? "display-none" : ""}>
          <NavLink to={profileRoute} onClick={handleProfile}>
            {isAuthenticated ? "Profile" : ""}
          </NavLink>
        </Menu.Item>
      </Menu>
      <div className="right-side">
        <NavLink
          to={signOutRoute}
          onClick={signOut}
          className={!isAuthenticated ? "display-none signout" : "signout"}
        >
          {isAuthenticated ? "Sign Out" : ""}
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
