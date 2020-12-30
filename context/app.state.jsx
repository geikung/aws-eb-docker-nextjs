import {
  createContext, useContext, useReducer, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { isServer } from '../shared/helpers';

const initialState = {
  user: {
    isAuthenticated: false,
  },
  cart: {
    count: 0,
  },
};
const store = createContext('state');
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
        },
      };
    case 'logout':
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
        },
      };
    case 'add':
      return {
        ...state,
        cart: {
          ...state.cart,
          count: state.cart.count + 1,
        },
      };
    case 'remove':
      return {
        ...state,
        cart: {
          ...state.cart,
          count: state.cart.count - 1,
        },
      };
    default:
      throw new Error();
  }
};

const persistKey = 'app-state';

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer,
    isServer
      ? initialState
      : JSON.parse(localStorage.getItem(persistKey)) || initialState,
  );

  useEffect(() => {
    localStorage.setItem(persistKey, JSON.stringify(state));
  }, [state]);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
};

AppProvider.defaultProps = {};
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => useContext(store);
