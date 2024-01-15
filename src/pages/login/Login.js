// Login.js
import { Spin, Divider, Select } from "antd";
import React, { useEffect } from 'react';
import spinnerjiff from "../../assets/images/loader.gif";

const Login = () => {

  useEffect(() => {
    const handleLogin = async () => {
      const authUrl = `https://auth.apeiron.network/login?client_id=6jk6h3n6hukhkqvul7hcqfh05u&response_type=token&scope=email+openid+phone+profile&redirect_uri=http://localhost:3000/callback`;
      //const authUrl = `https://auth.apeiron.network/login?client_id=6jk6h3n6hukhkqvul7hcqfh05u&response_type=token&scope=email+openid+phone+profile&redirect_uri=https://gems2.d2hjsv3slbr4gu.amplifyapp.com/callback`;
      window.location.href = authUrl;
    };

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