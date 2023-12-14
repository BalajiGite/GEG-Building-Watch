import { Menu } from "antd";
import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

  const sites = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={1}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const buildings = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={2}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const meter = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={3}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 6C3 4.34315 4.34315 3 6 3H16C16.3788 3 16.725 3.214 16.8944 3.55279C17.0638 3.89157 17.0273 4.29698 16.8 4.6L14.25 8L16.8 11.4C17.0273 11.703 17.0638 12.1084 16.8944 12.4472C16.725 12.786 16.3788 13 16 13H6C5.44772 13 5 13.4477 5 14V17C5 17.5523 4.55228 18 4 18C3.44772 18 3 17.5523 3 17V6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const signin = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={6}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const config = [
    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" key={8}>
      <path d="M9.562 13.688h.834l.25-1.063q.416-.104.719-.271.302-.166.552-.437l1.041.333.417-.75-.75-.708q.083-.354.104-.782.021-.427-.083-.781l.729-.687-.417-.75-1.02.312q-.25-.271-.563-.448-.313-.177-.729-.281l-.229-1.063h-.855l-.208 1.063q-.416.104-.729.281-.313.177-.563.448l-1.02-.333-.417.771.75.687q-.104.375-.104.781 0 .407.104.782l-.75.708.417.771 1.041-.354q.25.25.552.427.303.177.719.281ZM10 11.5q-.625 0-1.062-.438Q8.5 10.625 8.5 10t.438-1.062Q9.375 8.5 10 8.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm-5.25 5.083q-.562 0-.948-.385-.385-.386-.385-.948V4.75q0-.562.385-.948.386-.385.948-.385h10.5q.562 0 .948.385.385.386.385.948v10.5q0 .562-.385.948-.386.385-.948.385Z" />
    </svg>,
  ];
  const report = [
    <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" key={9}>
      <path d="M10 13.5q.25 0 .417-.167.166-.166.166-.416 0-.25-.166-.417-.167-.167-.417-.167-.25 0-.417.167-.166.167-.166.417 0 .25.166.416.167.167.417.167Zm-.542-2.312h1.084V6.167H9.458Zm-2.187 5.395-3.854-3.875V7.271l3.854-3.854h5.458l3.854 3.854v5.458l-3.875 3.854Z" />
    </svg>,
  ];
  const alert = [
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" key={10}>
      <path d="m1 18 9-15 9 15Zm9-2.5q.312 0 .531-.219.219-.219.219-.531 0-.312-.219-.531Q10.312 14 10 14q-.312 0-.531.219-.219.219-.219.531 0 .312.219.531.219.219.531.219ZM9.25 13h1.5V9h-1.5Z" />
    </svg>,
  ];

  return (
    <>
      <div className="brand">
        <img src={context.logoUrl} alt="" height={60} width={110} />
      </div>
      <hr />
      <Menu theme="light" mode="inline">
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
              {sites}
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
          <NavLink to="/building">
            <span
              className="icon"
              style={{
                background: page === "building" ? color : "",
              }}
            >
              {buildings}
            </span>
            <span
              style={{
                color:
                  (context.backgroundColor === dark) & (page === "building")
                    ? "black"
                    : (context.backgroundColor === dark) & (page !== "building")
                    ? "white"
                    : "black",
              }}
              className="label"
            >
              Buildings
            </span>
          </NavLink>
        </Menu.Item>
        {/**
        <Menu.Item key="4">
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
        <Menu.Item key="5">
          <NavLink to="/meter">
            <span
              className="icon"
              style={{
                background: page === "meter" ? color : "",
              }}
            >
              {meter}
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
              Meter
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
              {alert}
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
              className="label"
            >
              Alert
            </span>
          </NavLink>
        </Menu.Item>

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
        </Menu.Item>
        <Menu.Item key="12">
          <NavLink to="/config">
            <span className="icon">{config}</span>
            <span
              style={{
                color: context.backgroundColor === dark ? "white" : "black",
              }}
              className="label"
            >
              Config
            </span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
    </>
  );
}

export default Sidenav;
