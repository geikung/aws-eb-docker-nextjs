import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Layout, Menu, Breadcrumb, Badge,
} from 'antd';
import { ShoppingCartOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useMount } from 'ahooks';
import { useAppContext } from '../context/app.state';

const {
  Header, Footer, Content,
} = Layout;

const PageStyled = styled.div`
.ant-layout-content {
  min-height: calc(100vh - 110px);
}
`;

const Page = (props) => {
  const { children } = props;

  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { state } = useAppContext();
  const { cart } = state;

  const handleClick = ({ key }) => {
    router.push(key);
  };

  useMount(() => {
    setMounted(true);
  });

  if (!mounted) {
    return <div />;
  }

  return (
    <PageStyled>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            onClick={handleClick}
          >
            <Menu.Item key="/">Home</Menu.Item>
            <Menu.Item key="/about">About</Menu.Item>
            <Menu.Item key="/login">Login</Menu.Item>
            <Menu.Item key="/cart">
              <Badge count={cart.count}>
                <ShoppingCartOutlined style={{ color: '#fff' }} />
              </Badge>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>a</Breadcrumb.Item>
            <Breadcrumb.Item>b</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </PageStyled>
  );
};

Page.defaultProps = {};
Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
