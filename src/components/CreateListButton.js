import { getToken } from '@the-collab-lab/shopping-list-utils';
import { NavLink } from 'react-router-dom';

function CreateListButton({ setToken }) {
  function createTokenAndSaveToLocalStorage() {
    const token = window.localStorage.setItem('userToken', getToken());
    setToken(token);
    console.log('token: ', token);
  }

  return (
    <NavLink onClick={createTokenAndSaveToLocalStorage} to="/">
      Create New List
    </NavLink>
  );
}

export default CreateListButton;
