import { Menu,Divider } from "antd";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import sitesIcons from "../../assets/images/sidebar.svg/Sites.svg";
import meterIcon from "../../assets/images/sidebar.svg/Meter.svg";
import pointIcon from "../../assets/images/sidebar.svg/Point.svg";
import configIcon from "../../assets/images/sidebar.svg/Config.svg";
import alertsIcon from "../../assets/images/sidebar.svg/Alerts.svg";
import profileIcon from "../../assets/images/sidebar.svg/Kwh.svg";
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
      <Divider/>
      <div className="menu-wrapper">
        <Menu theme="light" mode="inline">
          <Menu.Item className="menu-item-header" key="0">
            Configuration
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
          <Menu.Item key="2">
            <NavLink to="/sites">
              <span
                className="icon"
                style={{
                  background: page === "sites" ? color : "",
                }}
              >
                <img src={sitesIcons} alt="sites_svg icons" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "sites")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "sites")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Sites
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/meter">
              <span
                className="icon"
                style={{
                  background: page === "meter" ? color : "",
                }}
              >
                <img src={meterIcon} alt="meterIcon" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "meter")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "meter")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Meters
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="4">
            <NavLink to="/point">
              <span
                className="icon"
                style={{
                  backgroundColor: page === "point" ? color : "",
                }}
              >
                <img src={pointIcon} alt="pointIcon" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "point")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "point")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Points
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="5">
            <NavLink to="/GeoConfigs">
              <span className="icon" 
              style={{
                backgroundColor:page === "GeoConfigs"? color: "",
              }}>
                <img src={configIcon} alt="configIcon" />
              </span>
              <span
                style={{
                  color: (context.backgroundColor === dark ? "white" : "black")
                    ? "black"
                    : (context.backgroundColor === dark) & (page !== "GeoConfigs")
                    ? "white"
                    : "black",
                }}
                className="label"
              >
                Location
              </span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="6">
            <NavLink to="/alert">
              <span
                className="icon"
                style={{
                  background: page === "alert" ? color : "",
                }}
              >
                <img src={alertsIcon} alt="alertIcon" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "alert")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "alert")
                      ? "white"
                      : "black",
                }}
                className="label">
                Alerts
              </span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="7">
            <NavLink to="/targets">
              <span
                className="icon"
                style={{
                  backgroundColor: page === "targets" ? color : "",
                }}
              >
                <img src={profileIcon} alt="profieIcon" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "profile")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "profile")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                Targets
              </span>
            </NavLink>
          </Menu.Item>
          <Divider />
          <Menu.Item className="menu-item-header" key="8">
            Monitoring
          </Menu.Item>
          <Menu.Item key="9">
            <NavLink to="/pointsReadings">
              <span
                className="icon"
                style={{
                  backgroundColor: page === "targets" ? color : "",
                }}
              >
                <img src={pointIcon} alt="profieIcon" />
              </span>
              <span
                style={{
                  color:
                    (context.backgroundColor === dark) & (page === "profile")
                      ? "black"
                      : (context.backgroundColor === dark) & (page !== "profile")
                      ? "white"
                      : "black",
                }}
                className="label"
              >
                MP Readings
              </span>
            </NavLink>
          </Menu.Item>
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
