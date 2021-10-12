import { getToken, words } from '@the-collab-lab/shopping-list-utils';
import { NavLink } from 'react-router-dom';

function CreateListButton() {
  return <NavLink to="/home">Create New List</NavLink>;
}

export default CreateListButton;
