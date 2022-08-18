import {  useDispatch } from "react-redux";
import { toggleCheck } from "../redux/slices/checkboxSlice";

export const Checkbox = (props) => {
  const { todo, isChecked } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCheck({ id: todo.id }));
  };

  return (
    <div className="checkbox" onClick={handleClick}>
      <input type="checkbox" checked={isChecked} readOnly />
      <div>
        {isChecked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="15"
            height="15"
          >
            <path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z" />
          </svg>
        ) : null}{" "}
      </div>
    </div>
  );
};
