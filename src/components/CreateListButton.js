import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { NavLink } from 'react-router-dom';

function CreateListButton({ setToken }) {
  function createTokenAndSaveToLocalStorage() {
    const token = window.localStorage.setItem(
      'userToken',
      JSON.stringify(getToken()),
    );
    setToken(token);
  }

  return (
    <NavLink onClick={createTokenAndSaveToLocalStorage} to="/">
      Create New List
    </NavLink>
  );
}

export default CreateListButton;
