import React, { useState, useEffect } from "react";
import { Menu, Grid } from "antd";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import { connect } from "react-redux";
import { Roles } from "../Roles/roles";
import { useLocation } from 'react-router-dom'
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

const { useBreakpoint } = Grid;

const LeftMenu = (props) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const location = useLocation();

  
  // const role = props.role;
  const role = props.userInfo.role;
  //console.log(props)

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
  const createTestRoute = isAuthenticated ? "/create-test" : "";
  const assignedTestRoute = isAuthenticated ? "/assigned-test" : "";
  //console.log(role)
  const style ={
    display: (location.pathname==="/start-test")?("none"):("block")
  }

  return (
    <div className="menu" style={style}>
      <Menu mode={md ? "horizontal" : "inline"}>
        <Menu.Item key="01">
          <NavLink to={homeRoute}>
            {isAuthenticated ? "Home" : "Sign In"}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="02">
          <NavLink to={Roles.teacher === role ? createTestRoute : testRoute}>
            {isAuthenticated
              ? Roles.teacher === role
                ? "Create Test"
                : "Attempt Test"
              : "SignUp"}
          </NavLink>
        </Menu.Item>
        <Menu.Item key="03" className={!isAuthenticated ? "display-none" : ""}>
          <NavLink
            to={Roles.teacher === role ? assignedTestRoute : resultRoute}
          >
            {isAuthenticated
              ? Roles.teacher === role
                ? "Assigned Test"
                : "Result"
              : ""}
          </NavLink>
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
    userInfo: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
