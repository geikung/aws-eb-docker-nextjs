// import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import App from 'next/app';
import { AppProvider } from '../context/app.state';
import Page from './@components/page';
import '../assets/styles.less';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </AppProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // const { ctx, Component } = appContext;
  // const isServer = !!ctx.req;

  return { ...appProps };
};

MyApp.defaultProps = {
  pageProps: {},
  store: {
    getState: () => {},
    subscribe: () => {},
    dispatch: () => {},
  },
};
MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object,
};

export default MyApp;
