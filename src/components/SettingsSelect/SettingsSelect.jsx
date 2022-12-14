import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { deleteTodo } from "../../redux/slices/todosSlice";
import { getUrl } from "../../helpers";
import { Dropdown } from "../Dropdown/Dropdown";
import { Modal } from "../Modal";
import { EditTodo } from "../EditTodo/EditTodo";
import "./SettingsSelect.scss";

const removeTodo = async (todoId) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const SettingsSelect = (props) => {
  const { todo } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const ref = useRef();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await removeTodo(props.todo.id);
      dispatch(deleteTodo({ todoIds: response }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(true);
  };

  const onOptionClick = (value) => {
    switch (value) {
      case "edit":
        return handleEdit();
      case "remove":
        return handleRemove();
    }
  };

  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });

  const options = [
    { label: "Edit", value: "edit" },
    { label: "Remove", value: "remove" },
  ];

  return (
    <>
      {isEdit ? (
        <Modal onClose={setIsEdit} isModalOpen={isEdit}>
          <EditTodo onClose={setIsEdit} todo={todo} />
        </Modal>
      ) : null}
      <div
        id="settings__options"
        className="dropdown__icon"
        ref={ref}
        onClick={handleDropdownClick}
        open={isDropdownOpen}
      >
        <FiMoreVertical />

        {isDropdownOpen ? (
          <Dropdown options={options} onSelect={onOptionClick} />
        ) : null}
      </div>
    </>
  );
};
