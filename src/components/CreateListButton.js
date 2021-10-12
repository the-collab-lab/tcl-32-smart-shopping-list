import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { NavLink } from 'react-router-dom';

function createTokenAndSaveToLocalStorage() {
  window.localStorage.setItem('userToken', JSON.stringify(getToken()));
}

function CreateListButton() {
  return (
    <NavLink onClick={createTokenAndSaveToLocalStorage} to="/home">
      Create New List
    </NavLink>
  );
}

export default CreateListButton;
