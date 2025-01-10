import { useState, useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEditNote } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let todos = JSON.parse(todoString); 
        setTodos(todos);
      } catch {
        setTodos([]); 
      }
    } else {
      setTodos([]); 
    }
  }, []);

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="md:container my-5 mx-auto   max-w-[70vw] rounded-xl p-5 bg-indigo-50 min-h-[88vh] md:w-[40%]">
        <h1 className="text-2xl text-center font-bold">
          todoList - Manage Your Todos Here
        </h1>
        <div className="addTodos my-5">
          <h2 className="text-lg font-bold text-center my-3">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="my-3 bg-blue-600 disabled:bg-blue-500 hover:bg-blue-800 p-2 py-1 text-sm font-bold text-white rounded-md w-full"
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          name=""
          id=""
        />
        Show Finished Todos
        <div className="bg-black h-[1px] opacity-15 mx-auto my-2 w-[90%]"></div>
        <h2 className="text-lg font-bold text-center my-2">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <h2 className="md:p-28 text-center">No Todos</h2>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex items-start md:w-full my-2 gap-3"
                >
                  {/* Checkbox */}
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    className="mt-1"
                  />

                  {/* Todo Content */}
                  <div
                    className={`${
                      item.isCompleted ? "line-through" : ""
                    } flex-grow break-words`}
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {item.todo}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-800 p-2 py-1 text-sm font-bold text-white rounded-md"
                    >
                      <MdEditNote />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-blue-500 hover:bg-blue-800 p-2 py-1 text-sm font-bold text-white rounded-md"
                    >
                      <MdOutlineDeleteSweep />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
