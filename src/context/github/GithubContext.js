import { useState, createContext } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //function to fetch users from github api
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}users`, {
      headers: {
        Authorization: `token${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
    // console.log(data);
  };
  return (
    <GithubContext.Provider value={{ users, isLoading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;
