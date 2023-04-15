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

  const searchUsers = async (text) => {
    setLoading();

    const param = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}search/users?${param}`,
      {
        headers: {
          Authorization: `token${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, searchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
