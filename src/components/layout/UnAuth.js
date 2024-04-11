import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Card, Affix } from "antd";
import Header from "./Header";
import 'antd/dist/antd.css'; 
import empty from '../../assets/images/Task_empty.svg'
import { AppContext } from "../../App";

const { Header: AntHeader, Content } = Layout; 
const { Meta } = Card;

function UnAuth() {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavType, setSidenavType] = useState("#001629");
  const [fixed, setFixed] = useState(true);

  const context = useContext(AppContext);
  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => context.setSidenavColor(color);
  const handleBackgroundColor = (color) => context.setBackgroundColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();

  return (
    <Layout
      style={{ backgroundColor: context.backgroundColor }}
      className={`layout-dashboard`}
    >
      <Affix offsetTop={0}>
        <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
          <Header
            onPress={openDrawer}
            name={pathname}
            subName={pathname}
            handleSidenavColor={handleSidenavColor}
            handleSidenavType={handleSidenavType}
            handleFixedNavbar={handleFixedNavbar}
            handleBackgroundColor={handleBackgroundColor}
          />
        </AntHeader>
      </Affix>
      <Content className="content-ant" >
        <div className="unauthorised-container">
          <div className="cart-container">
            <Card style={{ width: 450, textAlign: 'center' }} className={"custom_bg_unAuth"}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={empty} alt='' style={{width:"150px", width:"150px"}}/><br/>
                <Meta
                  title={<span className="textc5c5" >Sorry!</span>}
                  description={<span className="text8e8e" >We regret to inform you that you do not have authorization to access SBM, To gain access, please get in touch with the Verdeos Team at admin@verdeos.co. <br/> Thank you for your cooperation.</span>} 
                  style={{ textAlign: 'center' }}
                />
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default UnAuth;
