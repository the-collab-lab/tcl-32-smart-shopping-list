import { NavLink } from 'react-router-dom';

function CreateListButton({ createTokenAndSaveToLocalStorage }) {
  return (
    <NavLink onClick={createTokenAndSaveToLocalStorage} to="/list">
      Create New List
    </NavLink>
  );
}

export default CreateListButton;
