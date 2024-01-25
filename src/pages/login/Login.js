// Login.js
import { Spin, Divider, Select } from "antd";
import React, { useEffect,useContext } from 'react';
import spinnerjiff from "../../assets/images/loader.gif";
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from "../../App";

const Login = () => {

  const context = useContext(AppContext);
  const history = useHistory();
  const handleLogin = async () => {
    const storedToken = localStorage.getItem('jwtToken');
    const debubMode = false;
    if(!debubMode && storedToken){
      history.push('/GeoConfigs');
    }else{
      const authUrl = `https://auth.apeiron.network/login?client_id=6jk6h3n6hukhkqvul7hcqfh05u&response_type=token&scope=email+openid+phone+profile&redirect_uri=http://localhost:3000/callback`;
      //const authUrl = `https://auth.apeiron.network/login?client_id=6jk6h3n6hukhkqvul7hcqfh05u&response_type=token&scope=email+openid+phone+profile&redirect_uri=https://gems2.d2hjsv3slbr4gu.amplifyapp.com/callback`;
      window.location.href = authUrl;
    }
   
  };

  useEffect(() => {
    handleLogin();
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Optional: Set the height of the container to 100% of the viewport height
    }}>
        <Spin spinning={true} indicator={<img src={spinnerjiff} style={{ fontSize: 50 }} />} />
    </div>
  );
};

export default Login;
