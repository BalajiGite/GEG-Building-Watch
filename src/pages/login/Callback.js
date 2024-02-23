// Example using React Router
import React, { useEffect,useContext } from 'react';
import { Spin, Divider, Select } from "antd";
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from "../../App";
import spinnerjiff from "../../assets/images/loader.gif";
import { login, setupTokens } from '../../services/apis';

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  const context = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const callbackCode = new URLSearchParams(location.search).get('code');
        const awsTokens = await login(callbackCode);
        setupTokens(awsTokens)
        context.setToken(awsTokens.id_token);
        context.setRefreshToken(awsTokens.refresh_token)
        history.push('/Tracker');
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
    fetchData();

  }, [location, history]);

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

export default Callback;
