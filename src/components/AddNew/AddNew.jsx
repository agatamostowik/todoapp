import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/slices/todosSlice";
import { getUrl } from "../../helpers";
import "./AddNew.scss";

const createTodo = async (data) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const AddNew = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      label: value,
      ancestorsIds: props.ancestorsIds,
      parentId: props.parentId,
    };

    setIsLoading(true);
    try {
      const serverTodo = await createTodo(data);
      dispatch(addTodo({ todo: serverTodo }));
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setEditMode(false);
    setValue("");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const isButtonDisabled = isLoading || value.length === 0;

  return (
    <div id="add-new" className="todo-container">
      {!editMode ? (
        <div className="add-new__label" onClick={handleClick}>
          Add new
        </div>
      ) : (
        <form className="add-new__form" onSubmit={handleSubmit}>
          <input
            className="add-new__input"
            type="text"
            onChange={handleChange}
            value={value}
            autoFocus={true}
          ></input>
          <button className="btn" type="submit" disabled={isButtonDisabled}>
            {isLoading ? <div className="loader"></div> : "Add"}
          </button>
        </form>
      )}
    </div>
  );
};
