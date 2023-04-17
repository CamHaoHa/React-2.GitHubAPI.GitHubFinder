import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//create an instance to call axios
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token${GITHUB_TOKEN}` },
});

//seasrch users when submitting form
export const searchUsers = async (text) => {
  const param = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`search/users?${param}`);

  return response.data.items;
};

//fetch single user info and users's repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  });

  const [user, repos] = await Promise.all([
    github.get(`users/${login}`),
    github.get(`users/${login}/repos?${params}`),
  ]);

  return { user: user.data, repos: repos.data };
};
