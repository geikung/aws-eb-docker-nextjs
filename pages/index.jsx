import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import { useAppContext } from '../context/app.state';
import client from '../shared/axios';

const HomeStyled = styled.div`

`;

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  const appContext = useAppContext();
  const { state, dispatch } = appContext;
  const { user } = state;

  const {
    json,
    stars,
    API_URL,
    NODE_ENV,
    STAGE_ENV,
    DB_HOST,
  } = props;
  const { isAuthenticated } = user;

  console.log('json:', json);

  const loadData = async () => {
    const response = await client.get('/hello');
    setData(response.data);
  };

  useMount(() => {
    setMounted(true);
    loadData();
  });

  const handleLogin = () => {
    // setIsAuthenticated(true);
    dispatch({ type: 'login' });
  };
  const handleLogout = () => {
    // setIsAuthenticated(true);
    dispatch({ type: 'logout' });
  };

  const handleCountAdd = () => {
    setCount(count + 1);
    dispatch({ type: 'add' });
  };

  const handleCountRemove = () => {
    setCount(count - 1);
    dispatch({ type: 'remove' });
  };

  return (
    <HomeStyled>
      <div className="my-text">
        Client: {data ? data.message : 'Loading...'}
      </div>
      <div className="my-text">
        Server: stars => {stars}
      </div>
      <div className="my-text">
        API_URL: {API_URL}
      </div>
      <div className="my-text">
        NODE_ENV: {NODE_ENV}
      </div>
      <div className="my-text">
        STAGE_ENV: {STAGE_ENV}
      </div>
      <div className="my-text">
        DB_HOST: {DB_HOST}
      </div>

      <div>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleCountAdd}>Cart Add</Button>
        <Button onClick={handleCountRemove}>Cart Remove</Button>
      </div>
    </HomeStyled>
  );
};

Home.getInitialProps = async (ctx) => {
  // server
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  console.log('json:', json);
  return {
    json: json,
    stars: json.stargazers_count,
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV,
    STAGE_ENV: process.env.STAGE_ENV,
    DB_HOST: process.env.DB_HOST,
  };
};

Home.defaultProps = {
  json: null,
  stars: null,
  API_URL: null,
  NODE_ENV: null,
  STAGE_ENV: null,
  DB_HOST: null,
};
Home.propTypes = {
  json: PropTypes.object,
  stars: PropTypes.number,
  API_URL: PropTypes.string,
  NODE_ENV: PropTypes.string,
  STAGE_ENV: PropTypes.string,
  DB_HOST: PropTypes.string,
};

export default Home;
