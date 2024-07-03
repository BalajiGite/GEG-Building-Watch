import { useState, useContext } from "react";
import { AppContext } from "../../App";
import { Layout, Row, Col } from "antd";
import { UpOutlined } from '@ant-design/icons';
import { userInfo } from "../../services/apis";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const [showIframe, setShowIframe] = useState(false);
  const context = useContext(AppContext);

  var userData = userInfo(context.token);
  if(userData == null){
    if(localStorage.getItem('jwtToken') !=null){
      userData = userInfo(localStorage.getItem('jwtToken'))
      console.log("")
    }
  }

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <AntFooter className="ant-header-fixed-footer">
      {(userData["custom:Initials"] == "POG" || userData["custom:Initials"] == "BIG" || userData["custom:Initials"] == "KES") && (
        <Row className="just" justify="end">
        <Col>
          <button
            className="custom-button"
            style={{ backgroundColor: "rgb(244, 102, 74)", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
            onClick={toggleIframe}
          >
            Chat with VerdeOS Sage <UpOutlined style={{fontSize:"15px"}} />
          </button>
        </Col>
      </Row>)}
      {showIframe && (userData["custom:Initials"] == "POG" || userData["custom:Initials"] == "BIG" || userData["custom:Initials"] == "KES") &&(
        <div style={iframeContainerStyle}>
          <button
            onClick={toggleIframe}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 1001,
              backgroundColor: "rgb(244, 102, 74)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <iframe
            src={`https://www.appified.ai/embed/asst_aXkbi6GIHnuPoeWfO72DYfG9?authToken=${localStorage.getItem('jwtToken')}`}
            style={{ border: "0px #ffffff none", borderRadius: "10px" }}
            name="myiFrame"
            scrolling="no"
            frameBorder="1"
            marginHeight="0px"
            marginWidth="0px"
            height="600px"
            width="500px"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </AntFooter>
  );
}

const iframeContainerStyle = {
  position: "fixed",
  bottom: -6,
  right: 0,
  zIndex: 1000,
  margin: "0px",
};

export default Footer;
