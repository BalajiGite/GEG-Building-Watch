// Example using React Router
import React, { useEffect,useContext } from 'react';
import { Spin, Divider, Select } from "antd";
import { useLocation, useHistory } from 'react-router-dom';
import { AppContext } from "../../App";
import spinnerjiff from "../../assets/images/loader.gif";

const Callback = () => {
  const location = useLocation();
  const history = useHistory();
  const context = useContext(AppContext);

  useEffect(() => {

    const params = new URLSearchParams(location.hash.substring(1));
    const token = params.get('id_token');
    localStorage.setItem('jwtToken', token);
    context.setToken(token);
    history.push('/GeoConfigs');
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
