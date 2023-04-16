import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GithubContext from '../../context/github/GithubContext';
function User() {
  const { user, getUser, isLoading } = useContext(GithubContext);
  const params = useParams();
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{name}</div>;
}

export default User;
