import { Dispatch, SetStateAction } from "react";
import { inputType, todoType } from "../types";


interface formProps{
    inputTexts:inputType;
    setInputTexts:Dispatch<SetStateAction<inputType>>;
    todoList:todoType[];
    editMode:boolean;
    setTodoList:Dispatch<SetStateAction<todoType[]>>;
    toggleEditMode:Dispatch<SetStateAction<boolean>>;
}
const TodoForm = ({inputTexts,setInputTexts,todoList,editMode,setTodoList,toggleEditMode}:formProps) => {
  return (
    <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputTexts.titleInput.length === 0)
            alert("Title of todo is empty!!");
          else {
            setTodoList([
              ...todoList,
              {
                title: inputTexts.titleInput,
                date: inputTexts.dateCreated,
                currentStatus: "Pending",
                id: String(Math.random() * 1000),
              },
            ]);
            setInputTexts({
              titleInput: "",
              dateCreated: "",
            });
            document.getElementsByTagName("form")![0].reset();
            alert("Added Successfully!");
          }
        }}
      >
        <input
          type="text"
          placeholder="Enter Name Of Task"
          value={inputTexts.titleInput}
          name="textInput"
          onChange={(e) => {
            setInputTexts((prev) => ({ ...prev, titleInput: e.target.value }));
          }}
        />
        <input
          type="date"
          onChange={(e) => {
            setInputTexts((prev) => ({ ...prev, dateCreated: e.target.value }));
          }}
        />
        {editMode ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              todoList.forEach((todo) => {
                if (todo.id === inputTexts.id) {
                  todo.title = inputTexts.titleInput;
                  todo.date = inputTexts.dateCreated;
                }
              });
              setTodoList([...todoList]);
              inputTexts.titleInput = "";
              document.getElementsByTagName("form")![0].reset();
              toggleEditMode(false);
              alert("Updated Successfully!");
            }}
          >
            Update
          </button>
        ) : (
          <button type="submit">Add</button>
        )}
      </form>
  )
}

export default TodoForm