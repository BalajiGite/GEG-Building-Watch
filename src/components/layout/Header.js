import { useState, useEffect, useContext } from "react";
import { Divider, Form, Upload } from "antd";
import { IoIosSettings } from "react-icons/io";
// import ImageUploading from 'react-images-uploading';
import React from "react";
import { AppContext } from "../../App";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Image,
  Popover,
  ConfigProvider,
} from "antd";
import { userInfo } from "../../services/apis";


import { } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import styled from "styled-components";
import avtar from "../../assets/images/img-signin.jpg";
import menubar from "../../assets/images/menu_bar_svg.svg";
import alert from "../../assets/images/alert_svg.svg";
import Ellips from "../../assets/images/Ellipse 45.svg";
import BPM from "../../assets/images/Header-section/BPM.svg";
import managment from "../../assets/images/Header-section/Management.svg";
import BMM from "../../assets/images/Header-section/BMM.svg"
import SBM from "../../assets/images/Header-section/SBM.svg";
import DP from "../../assets/images/Header-section/DP.svg";
const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;


const content = (
  <div style={{ width: "204px", height: "154px", paddingTop:"12px",  paddingLeft:'20px', paddingRight:'20px',backgroundColor:"#0A1016",}}>
    <Row style={{ justifyContent: "space-between" }}>
      <Col>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img src={BPM} alt="BPM_svg" />
        </div>
        <p >BPM</p>
      </Col>
      <Col>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img src={managment} alt="managment_svg" />
        </div>
        <p>BSM</p>
      </Col>
      <Col>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img src={BMM} alt="BMM_svg" />
        </div>
        <p>BMM</p>
      </Col>
    </Row>
    <hr />
    <Row style={{ justifyContent: "space-between" }}>
      <Col>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img src={SBM} alt="SBM-svg" />
        </div>
        <p>SBM</p>
      </Col>
      <Col>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <img src={DP} alt="DP-svg" />
        </div>
        <p>DP</p>
      </Col>
      <Col span={8}></Col>
    </Row>
  </div>
);

const handleSignOut = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = 'https://auth.apeiron.network/logout';
  window.location.href = '/';
};

const profile = (userInfo)=>(
  <div style={{ paddingLeft:'12px', paddingRight:'12px',backgroundColor:"#0A1016", height: "200px", width: "221px", }}>
    <Row style={{ justifyContent: "center", display: "flex" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#1B2228" />
        <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="14" fill="#fff">{userInfo!=null?userInfo["custom:Initials"]:""}</text>
      </svg>

    </Row>
    <div style={{ textAlign: "center" }}>
      <p style={{ marginBottom: "0px" }}><b>{userInfo!=null?userInfo["custom:ContactFullName"]:""}</b></p>
      <p>{userInfo!=null?userInfo.email:""}</p>
    </div>
    <div>
      <h6>Account Setting</h6>
      <hr style={{boxSizing:"border-box"}}/>
      <button className="logout-button" onClick={handleSignOut}><h6>Logout</h6></button>
    </div>
  </div>
);

const wifi = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 107 107"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="logo-spotify" fill="#2EBD59" fillRule="nonzero">
        <path
          d="M53.5,0 C23.9517912,0 0,23.9517912 0,53.5 C0,83.0482088 23.9517912,107 53.5,107 C83.0482088,107 107,83.0482088 107,53.5 C107,23.9554418 83.0482088,0.00365063118 53.5,0 Z M78.0358922,77.1597407 C77.0757762,78.7368134 75.0204708,79.2296486 73.4506994,78.2695326 C60.8888775,70.5922552 45.0743432,68.8582054 26.4524736,73.1111907 C24.656363,73.523712 22.8675537,72.3993176 22.458683,70.6032071 C22.0461617,68.8070966 23.1669055,67.0182873 24.9666667,66.6094166 C45.3444899,61.9548618 62.8273627,63.9590583 76.9297509,72.5745479 C78.4995223,73.5419652 78.9996588,75.5899693 78.0358922,77.1597407 L78.0358922,77.1597407 Z M84.5814739,62.5973729 C83.373115,64.5614125 80.8030706,65.1747185 78.8426817,63.9700102 C64.4664961,55.1318321 42.5408052,52.5727397 25.5325145,57.7347322 C23.3275333,58.4027977 20.9984306,57.1579324 20.3267144,54.9566018 C19.6622996,52.7516206 20.9071648,50.4261685 23.1084954,49.7544524 C42.5371546,43.858683 66.6933811,46.7134766 83.2051859,56.8622313 C85.1692255,58.0705902 85.7898328,60.636984 84.5814739,62.5973729 Z M85.1436711,47.4253497 C67.8980894,37.1853292 39.4523712,36.2434664 22.9880246,41.2375299 C20.3449676,42.0406687 17.5485841,40.5475606 16.7490959,37.9045036 C15.9496076,35.2614466 17.4390652,32.4650631 20.0857728,31.6619243 C38.9850904,25.9267827 70.3987718,27.0329239 90.2509041,38.8171614 C92.627465,40.2299556 93.4087001,43.3001365 91.9995565,45.6730467 C90.5940635,48.0532583 87.5165814,48.838144 85.1436711,47.4253497 Z"
          id="Shape"
        ></path>
      </g>
    </g>
  </svg>,
];

const credit = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fill="#1890FF"
      d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
    ></path>
    <path
      fill="#1890FF"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
    ></path>
  </svg>,
];

const clockicon = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
      fill="#111827"
    ></path>
  </svg>,
];

const data = [
  {
    title: "New message from Sophie",
    description: <>{clockicon} 2 days ago</>,

    avatar: avtar,
  },
  {
    title: "New album by Travis Scott",
    description: <>{clockicon} 2 days ago</>,

    avatar: <Avatar shape="square">{wifi}</Avatar>,
  },
  {
    title: "Payment completed",
    description: <>{clockicon} 2 days ago</>,
    avatar: <Avatar shape="square">{credit}</Avatar>,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);
const dark = "#454545";

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleBackgroundColor,

  handleSidenavType,
  handleFixedNavbar,
}) {
  const context = useContext(AppContext);
  const { Title, Text } = Typography;
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  
  var userData = userInfo(context.token);
  if(userData == null){
    if(localStorage.getItem('jwtToken') !=null){
      userData = userInfo(localStorage.getItem('jwtToken'))
    }
  }
  
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadLogo = async (file, fileList) => {
    try {
      const resp = await toBase64(file);
      context.setLogoUrl(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div
        style={{ color: context.sidenavColor }}
        className="setting-drwer"
        onClick={showDrawer}
      >
        <IoIosSettings />
      </div> */}
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <img src={context.logoUrl} alt="" width={150} />
        </Col>
        <Col span={24} md={6}>
          <Breadcrumb style={{ display: "none" }}>
            <Breadcrumb.Item>
              <NavLink to="/">
                {" "}
                <span
                  style={{
                    color: context.backgroundColor === dark ? "white" : "",
                  }}
                >
                  Pages
                </span>
              </NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              <span
                style={{
                  color: context.backgroundColor === dark ? "white" : "",
                }}
              >
                {" "}
                {name.replace("/", "")}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              <span
                style={{
                  color: context.backgroundColor === dark ? "white" : "",
                }}
              >
                {" "}
                {/* subName.replace("/", "")*/}
              </span>
            </span>
          </div>
        </Col>
        <Col span={24} md={12} className="header-control">
          <Button type="link" onClick={showDrawer}>
            <IoSettingsOutline />
          </Button>
          <Col >
            <ConfigProvider>
              <Popover placement="bottomLeft" content={profile(userData)}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" fill="none" style={{ cursor: 'pointer',width:"auto",height:"30px" }}>
                  <circle cx="20" cy="20" r="20" fill="#1B2228" />
                  <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="14" fill="#fff">{userData!=null?userData["custom:Initials"]:""}</text>
                </svg>
              </Popover>
            </ConfigProvider>
          </Col>
          <Col>
            <img src={alert} alt="alert_svg" style={{ cursor: 'pointer' }} />
          </Col>
          <Col>
            <ConfigProvider >
              <Popover placement="bottomLeft" trigger="click" content={content}>
                <img src={menubar} alt="menuBar_svg" style={{ cursor: 'pointer' }} />
              </Popover>
            </ConfigProvider>
          </Col>
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <div>
            <Drawer
              className="settings-drawer"
              mask={true}
              width={360}
              onClose={hideDrawer}
              placement={placement}
              open={visible}
              bodyStyle={{ backgroundColor: context.backgroundColor }}
              headerStyle={{ backgroundColor: context.backgroundColor }}
            >
              <div
                layout="vertical"
                style={{ backgroundColor: context.backgroundColor }}
              >
                <div className="header-top">
                  <Title
                    level={4}
                    style={{
                      color: context.backgroundColor === dark ? "white" : "",
                    }}
                  >
                    Configuration
                    <Text className="subtitle">See our dashboard options.</Text>
                  </Title>
                </div>

                <div className="sidebar-color">
                  <Title
                    style={{
                      color: context.backgroundColor === dark ? "white" : "",
                    }}
                    level={5}
                  >
                    {" "}
                    Color
                  </Title>
                  <div className="theme-color mb-2">
                    <ButtonContainer>
                      <Button
                        type="primary"
                        onClick={() => handleSidenavColor("#1890ff")}
                      >
                        1
                      </Button>
                      <Button
                        type="success"
                        onClick={() => handleSidenavColor("#52c41a")}
                      >
                        1
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => handleSidenavColor("#d9363e")}
                      >
                        1
                      </Button>
                      <Button
                        type="yellow"
                        onClick={() => handleSidenavColor("#fadb14")}
                      >
                        1
                      </Button>

                      <Button
                        type="black"
                        onClick={() => handleSidenavColor(dark)}
                      >
                        1
                      </Button>
                      <Button
                        type=""
                        onClick={() => handleSidenavColor("#gray")}
                      >
                        1
                      </Button>
                      <Button
                        type=""
                        style={{ backgroundColor: "rgb(28, 136, 178)" }}
                        onClick={() => handleSidenavColor(" rgb(28, 136, 178)")}
                      >
                        1
                      </Button>
                    </ButtonContainer>
                  </div>
                  <Title
                    style={{
                      color: context.backgroundColor === dark ? "white" : "",
                    }}
                    level={5}
                  >
                    background Color
                  </Title>
                  <div className="theme-color mb-2">
                    <ButtonContainer>
                      <Button
                        type="primary"
                        onClick={() => handleBackgroundColor("skyblue")}
                      >
                        1
                      </Button>
                      <Button
                        type="success"
                        onClick={() => handleBackgroundColor("#98FF98")}
                      >
                        1
                      </Button>
                      <Button
                        type="danger"
                        onClick={() => handleBackgroundColor("#FF9999")}
                      >
                        1
                      </Button>
                      <Button
                        type="yellow"
                        onClick={() => handleBackgroundColor("#fadb14")}
                      >
                        1
                      </Button>
                      <Button
                        type="tra"
                        onClick={() => handleBackgroundColor("transparent")}
                      >
                        1
                      </Button>
                      <Button
                        type="black"
                        onClick={() => handleBackgroundColor(dark)}
                      >
                        1
                      </Button>
                      <Button
                        type=""
                        style={{ backgroundColor: "rgb(28, 136, 178)" }}
                        onClick={() =>
                          handleBackgroundColor(" rgb(28, 136, 178)")
                        }
                      >
                        1
                      </Button>
                    </ButtonContainer>
                  </div>

                  <div className="sidebarnav-color mb-2">
                    <Title
                      style={{
                        color: context.backgroundColor === dark ? "white" : "",
                      }}
                      level={5}
                    >
                      Sidenav Type
                    </Title>
                    <Text>Choose between 2 different sidenav types.</Text>
                    <ButtonContainer className="trans">
                      <Button
                        type={
                          sidenavType === "transparent" ? "primary" : "white"
                        }
                        onClick={() => {
                          handleSidenavType("transparent");
                          setSidenavType("transparent");
                        }}
                      >
                        TRANSPARENT
                      </Button>
                      <Button
                        type={sidenavType === "white" ? "primary" : "white"}
                        onClick={() => {
                          handleSidenavType("#fff");
                          setSidenavType("white");
                        }}
                      >
                        WHITE
                      </Button>
                    </ButtonContainer>
                  </div>

                  <Row gutter>
                    <Col xs={24} md={24} lg={24}>
                      <div className="sideheaderlogo">
                        <Text
                          style={{
                            color:
                              context.backgroundColor === dark ? "white" : "",
                          }}
                        >
                          LOGO
                        </Text>
                        <div>
                          <Upload
                            showUploadList={false}
                            beforeUpload={uploadLogo}
                          >
                            <Button style={{ width: "310px" }}>
                              Click to Upload
                            </Button>
                          </Upload>
                        </div>

                        <div>
                          <Form.Item
                            name="hight"
                            label=""
                            style={{
                              marginTop: 15,
                              color:
                                context.backgroundColor === dark ? "white" : "",
                            }}
                          >
                            HEIGHT
                            <Input
                              style={{ width: "310px" }}
                              placeholder="eg 40 (optional)"
                            />
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item>
                            <span
                              style={{
                                color:
                                  context.backgroundColor === dark
                                    ? "white"
                                    : "",
                              }}
                            >
                              {" "}
                              APP ICON{" "}
                            </span>
                            <Input
                              style={{ width: "310px" }}
                              value="{{app.application builder}}"
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="middle2" xs={24} md={24} lg={24}>
                      <div className="themes">
                        <small
                          style={{
                            color:
                              context.backgroundColor === dark ? "white" : "",
                          }}
                        >
                          Themes
                        </small>
                      </div>

                      <Button className="btnheaderGeg">Geg</Button>
                      <Button className="btnheaderRed">Red</Button>
                      <Button className="btnheaderGreen">Green</Button>
                      <Button className="btnheaderSalmon">Salmon</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Drawer>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Header;
