import PropTypes from 'prop-types';
import RepoItems from './RepoItem';
function RepoList({ repos }) {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          10 Latest Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItems
            key={repo.id}
            repo={repo}
          />
        ))}
      </div>
    </div>
  );
}

RepoList.propTypes = { repos: PropTypes.array.isRequired };
export default RepoList;
