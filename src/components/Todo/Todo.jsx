import { useState } from "react";
import { useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Todos } from "../Todos/Todos";
import { Tag } from "../Tag/Tag";
import "./Todo.scss";
import { TodoStatusSelect } from "../TodoStatusSelect/TodoStatusSelect";
import { SettingsSelect } from "../SettingsSelect/SettingsSelect";

export const Todo = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const filteredTodos = todos.filter((todo) => {
    return todo.parentId === props.todo.id;
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isTagExist = props.todo.tags.length !== 0;

  return (
    <>
      <div className="row-container">
        <div className="input">
          <div className="todo__color"></div>
          <div className="todo__label__wrapper">
            <div className="todo__label">{props.todo.label}</div>
            {isTagExist ? <Tag tags={props.todo.tags} /> : null}
          </div>
          <TodoStatusSelect todo={props.todo} />
          <div className="chevron-container" onClick={handleClick}>
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </div>
        <SettingsSelect todo={props.todo} />
      </div>
      {isOpen ? (
        <Todos
          isRoot={false}
          todos={filteredTodos}
          ancestorsIds={[...props.todo.ancestorsIds, props.todo.id]}
          parentId={props.todo.id}
        />
      ) : null}
    </>
  );
};
