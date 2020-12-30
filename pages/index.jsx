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

  const { stars } = props;
  const { isAuthenticated } = user;

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
  return { stars: json.stargazers_count };
};

Home.defaultProps = {
  stars: null,
};
Home.propTypes = {
  stars: PropTypes.number,
};

export default Home;
