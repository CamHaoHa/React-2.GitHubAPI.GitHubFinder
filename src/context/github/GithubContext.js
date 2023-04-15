import { useReducer, createContext } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  //function to fetch users from github api
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}users`, {
      headers: {
        Authorization: `token${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    dispatch({
      type: 'GET_USERS',
      payload: data,
    });
  };
  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
