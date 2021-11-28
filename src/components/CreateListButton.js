import { NavLink } from 'react-router-dom';

function CreateListButton({ createTokenAndSaveToLocalStorage }) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center my-10 w-9/12 md:w-full bg-yellow-50 bg-opacity-50 rounded-md">
      <NavLink
        onClick={createTokenAndSaveToLocalStorage}
        to="/list"
        className="block flex justify-center items-center text-ronchi-yellow bg-gray-700 rounded-full h-10 w-8/12 font-serif font-bold hover:bg-ronchi-yellow hover:text-gray-700 transition duration-500"
      >
        Create New List
      </NavLink>
    </div>
  );
}

export default CreateListButton;
