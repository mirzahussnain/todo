import { ReactNode, useState } from "react";
import "./App.css";
import FilterContainer from "./components/filterContainer";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/todoItem";
import { inputType, status, todoType } from "./types";

let dropDownCount: number = 0;
function App() {
  const [inputTexts, setInputTexts] = useState<inputType>({
    titleInput: "",
    dateCreated: "",
  });
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [filteredList, setFilteredList] = useState<todoType[]>([]);
  const [filterMod, toggleFilterMod] = useState<boolean>(false);
  const [dropDown, toggleDropDown] = useState<boolean>(false);
  const [editMode, toggleEditMode] = useState<boolean>(false);

  const handleEdit = (index: number) => {
    const todo = todoList[index];
    inputTexts.titleInput = todo.title;
    inputTexts.id = todo.id;
    toggleEditMode(!editMode);
  };

  const handleToggleDropDown = (index: number) => {
    toggleDropDown(!dropDown);
    dropDownCount = index;
  };

  const handleDelete = (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const handleStatusChange = (index: number, status: status) => {
    todoList[index].currentStatus = status;
    setTodoList([...todoList]);
    toggleDropDown(false);
  };

  const renderDropDown = (index: number) => (
    <div id="dropDown" onMouseLeave={() => toggleDropDown(false)}>
      <button
        value="Pending"
        onClick={() => handleStatusChange(index, "Pending")}
        disabled={todoList[index].currentStatus === "Pending"}
        style={{
          cursor: `${
            todoList[index].currentStatus === "Pending"
              ? "not-allowed"
              : "pointer"
          }`,
        }}
      >
        Pending
      </button>
      <button
        value="Completed"
        onClick={() => handleStatusChange(index, "Completed")}
        disabled={todoList[index].currentStatus === "Completed"}
        style={{
          cursor: `${
            todoList[index].currentStatus === "Completed"
              ? "not-allowed"
              : "pointer"
          }`,
        }}
      >
        Completed
      </button>
    </div>
  );

  const renderNoTaskFound = () => (
    <tr>
      <td colSpan={4} id="no-data-cell">
        No Task Found!!
      </td>
    </tr>
  );

  const renderTodoItem = (todo: todoType, index: number) => (
    <TodoItem
      todo={todo}
      index={index}
      handleDelete={handleDelete}
      handleDropDown={handleToggleDropDown}
      handleEdit={handleEdit}
      renderDropDown={renderDropDown}
      dropDown={dropDown}
      dropDownCount={dropDownCount}
    />
  );

  const renderTodoList = (todoList: todoType[]): ReactNode => {
    return filterMod
      ? filteredList.length > 0
        ? filteredList.map((todo, index) => renderTodoItem(todo, index))
        : renderNoTaskFound()
      : todoList.length > 0
      ? todoList.map((todo, index) => renderTodoItem(todo, index))
      : renderNoTaskFound();
  };

  return (
    <div id="container">
      <h1>Todo App</h1>
      <TodoForm
        inputTexts={inputTexts}
        setInputTexts={setInputTexts}
        todoList={todoList}
        setTodoList={setTodoList}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
      <FilterContainer
        todoList={todoList}
        setFilteredList={setFilteredList}
        filterMod={filterMod}
        setTodoList={setTodoList}
        toggleFilterMode={toggleFilterMod}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderTodoList(todoList)}</tbody>
      </table>
    </div>
  );
}

export default App;
