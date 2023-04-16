import { useReducer, useState, createContext } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = useState(null);

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (type, msg) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: 'CLEAR_ALERT' }), 3000);
  };
  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
export default AlertContext;