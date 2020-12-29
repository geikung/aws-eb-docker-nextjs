import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMount } from 'ahooks';
import { Button } from 'antd';
import { useAppContext } from '../context/app.state';

const HomeStyled = styled.div`

`;

const Home = (props) => {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);

  const appContext = useAppContext();
  const { state, dispatch } = appContext;
  const { user } = state;

  const { isAuthenticated } = user;

  console.log('isAuthenticated:', isAuthenticated);
  // const { isAuthenticated } = useValues(authLogic);
  // const { setIsAuthenticated } = useActions(authLogic);
  // console.log('isAuthenticated:', isAuthenticated);
  // console.log('setIsAuthenticated:', setIsAuthenticated);

  useMount(() => {
    setMounted(true);
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
      <label className="my-text">HomeAAABBB</label>

      <div>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleLogout}>Logout</Button>
        <Button onClick={handleCountAdd}>Cart Add</Button>
        <Button onClick={handleCountRemove}>Cart Remove</Button>
      </div>
    </HomeStyled>
  );
};

export default Home;
// export default keaConnect(Home);
