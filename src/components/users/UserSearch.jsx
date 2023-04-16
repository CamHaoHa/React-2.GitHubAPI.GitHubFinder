import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';

function UserSearch() {
  const { users, searchUsers, clearUsersState } = useContext(GithubContext);
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alert('Please enter a text');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className=" w-full pr-40 bg-gray-200 input-primary input input-lg  text-black"
                placeholder="Search"
                onChange={handleTextChange}
                value={text}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg "
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            className="btn btn-ghost btn-lg"
            onClick={clearUsersState}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
