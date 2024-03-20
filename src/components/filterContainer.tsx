import { Dispatch, SetStateAction } from "react";
import { todoType } from "../types";

interface props{
    toggleFilterMode:Dispatch<SetStateAction<boolean>>;
    filterMod:boolean,
    setFilteredList:Dispatch<SetStateAction<todoType[]>>;
    todoList:todoType[],
    setTodoList:Dispatch<SetStateAction<todoType[]>>;
}
const FilterContainer = ({todoList,setTodoList,filterMod,setFilteredList,toggleFilterMode}:props) => {
  return (
    <div className="filterContainer">
        <button
          onClick={() => toggleFilterMode(!filterMod)}
          title="Filter Tasks"
        >
          Filter
        </button>
        {filterMod && (
          <div
            id="filter-dropdown"
            onMouseLeave={(e) => {
              e.currentTarget.style["visibility"] = "hidden";
            }}
          >
            <button
              onClick={() => {
                setFilteredList([...todoList]);
              }}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilteredList(
                  todoList.filter((todo) => todo.currentStatus === "Pending")
                );
              }}
            >
              Pending
            </button>
            <button
              onClick={() => {
                setFilteredList(
                  todoList.filter((todo) => todo.currentStatus === "Completed")
                );
              }}
            >
              Completed
            </button>
          </div>
        )}
        <button onClick={() => setTodoList([])}>Delete All</button>
      </div>
  )
}

export default FilterContainer