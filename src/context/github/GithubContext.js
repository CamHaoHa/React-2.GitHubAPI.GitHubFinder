import { useReducer, createContext } from 'react';
import githubReducer from './GithubReducer';
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  //seasrch users when submitting form
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

  //fetch single user info
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}users/${login}`,
      {
        headers: {
          Authorization: `token${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    if (response.status === 404) {
      window.location('/notfound');
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };
  //clear users state when user click the clear button
  const clearUsersState = () => {
    setLoading();

    dispatch({
      type: 'CLEAR_USERS',
    });
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        isLoading: state.isLoading,
        searchUsers,
        clearUsersState,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
