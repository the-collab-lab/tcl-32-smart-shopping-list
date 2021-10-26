import { NavLink } from 'react-router-dom';

function CreateListButton({ getUserToken, createTokenAndSaveToLocalStorage }) {
  return (
    <NavLink onClick={createTokenAndSaveToLocalStorage} to="/additem">
      Create New List
    </NavLink>
  );
}

export default CreateListButton;
