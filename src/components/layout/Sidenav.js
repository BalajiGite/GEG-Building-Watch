import { Menu,Divider } from "antd";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import sitesIcons from "../../assets/images/sidebarSVG/Sites.svg";
import meterIcon from "../../assets/images/sidebarSVG/Meter.svg";
import pointIcon from "../../assets/images/sidebarSVG/Point.svg";
import targetIcon from "../../assets/images/sidebarSVG/targets.svg";
import configIcon from "../../assets/images/sidebarSVG/location.svg";
import alertsIcon from "../../assets/images/sidebarSVG/Alerts.svg";
import mpReadings from "../../assets/images/sidebarSVG/mpReadings.svg";
import tracker from "../../assets/images/sidebarSVG/tracker.svg";
// import logo from "../../assets/images/buildlogo.jpg";
import { AppContext } from "../../App";
function Sidenav({ color }) {
  const context = useContext(AppContext);

  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const dark = "#454545";
  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        {/*<img src={context.logoUrl} alt=""  width={150} />*/}
        Sustainable Building Manager(SBM)
      </div>
      <Divider className="custom-divider"/>
      <div className="menu-wrapper">
        <Menu theme="light" mode="inline">
          <Menu.Item className="menu-item-header" key="8">
            <span className ="ant-menu-item-text">
              Monitoring
            </span>
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/pointsReadings">
            <span className="icon">
                <img src={mpReadings} alt="profieIcon" />
              </span>
              <span className ="ant-menu-item-text">
              Meter Readings
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="10">
            <NavLink to="/tracker">
            <span className="icon">
                <img src={tracker} alt="trackerIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Tracker
              </span>
            </NavLink>
          </Menu.Item>
          <Divider className="custom-divider" />
          <Menu.Item className="menu-item-header" key="0">
            <span className ="ant-menu-item-text">
              Configuration
            </span>
          </Menu.Item>
          {/*
          <Menu.Item key="1">
            <NavLink to="/dashboard">
              <span
                className="icon"
                style={{
                  background: page === "dashboard" ? color : "",
                }}
              >
                {dashboard}
              </span>

              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "dashboard")
                      ? "black"
                      : (context.backgroundColor === dark) &
                        (page !== "dashboard")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Dashboard
              </span>
            </NavLink>
          </Menu.Item>
          */}
          <Menu.Item key="5">
            <NavLink to="/GeoConfigs">
            <span className="icon">
                <img src={configIcon} alt="configIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Location
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="2">
            <NavLink to="/sites">
              <span className="icon">
                <img src={sitesIcons} alt="sites_svg icons" />
              </span>
              <span className ="ant-menu-item-text">
                Sites
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/meter">
            <span className="icon">
                <img src={meterIcon} alt="meterIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Meters
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/point">
            <span className="icon">
                <img src={pointIcon} alt="pointIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Points
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink to="/targets">
            <span className="icon">
                <img src={targetIcon} alt="profieIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Targets
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="6">
            <NavLink to="/alert">
            <span className="icon">
                <img src={alertsIcon} alt="alertIcon" />
              </span>
              <span className ="ant-menu-item-text">
                Alerts
              </span>
            </NavLink>
          </Menu.Item>
          <Divider className="custom-divider"/>
          {/* <Menu.Item key="5">
            <NavLink to="/projects">
              <span
                className="icon"
                style={{
                  background: page === "projects" ? color : "",
                }}
              >
                {projects}
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "projects")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "projects")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Projects
              </span>
            </NavLink>
            </Menu.Item> */}
          {/**
          <Menu.Item key="5">
            <NavLink to="/buildingPerformance">
              <span
                className="icon"
                style={{
                  background: page === "buildingPerformance" ? color : "",
                }}
              >
                {buildings}
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) &
                    (page === "buildingPerformance")
                      ? "black"
                      : (context.backgroundColor === dark) &
                        (page !== "buildingPerformance")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Building Performance
              </span>
            </NavLink>
          </Menu.Item>
          */}

          {/** 
          <Menu.Item key="7">
            <NavLink to="/report">
              <span
                className="icon"
                style={{
                  background: page === "report" ? color : "",
                }}
              >
                {report}
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "report")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "report")
                      ? "white"
                      : "black",
                }}
              >
                Report
              </span>
            </NavLink>
          </Menu.Item>
          */}
          {/*
          <Menu.Item className="menu-item-header" key="8">
            Account Pages
          </Menu.Item>

          <Menu.Item key="10">
            <NavLink to="/sign-in">
              <span className="icon">{signin}</span>
              <span
                style={{
                  color: context.backgroundColor === dark ? "white" : "black",
                }}
                className="label"
              >
                Sign In
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="11">
            {/* <NavLink to="/sign-up">
              <span className="icon">{signup}</span>
              <span className="label">Sign Up</span>
            </NavLink> //}
              </Menu.Item> */}
        </Menu>
      </div>
    </>
  );
}

export default Sidenav;
