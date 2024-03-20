import { CiEdit } from "react-icons/ci";
import { todoType } from "../types";
import { IoCheckmark } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";

interface itemProps {
  todo: todoType;
  index: number;
  handleEdit: (index: number) => void;
  handleDropDown: (index: number) => void;
  handleDelete: (id: string) => void;
  renderDropDown: (index: number) => JSX.Element;
  dropDown: boolean;
  dropDownCount: number;
}
const TodoItem = ({
  todo,
  index,
  dropDown,
  dropDownCount,
  handleDelete,
  handleDropDown,
  handleEdit,
  renderDropDown,
}: itemProps) => {
  return (
    <tr key={todo.id}>
      <td className={todo.currentStatus === "Completed" ? "textCutout" : ""}>
        {todo.title}
      </td>
      <td>{todo.date.length > 0 ? todo.date : "No due date"}</td>
      <td>{todo.currentStatus}</td>
      <td className="actionCell">
        <button title="Edit Task Details" onClick={() => handleEdit(index)}>
          <CiEdit />
        </button>
        <button title="Change Status" onClick={() => handleDropDown(index)}>
          <IoCheckmark />
        </button>
        <button title="Delete Task" onClick={() => handleDelete(todo.id)}>
          <BiTrash />
        </button>
        {dropDownCount === index && dropDown && renderDropDown(index)}
      </td>
    </tr>
  );
};

export default TodoItem;
