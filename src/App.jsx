import { useEffect, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleInput(value) {
    console.log("value", value)
    setTaskInput(value);
  }

  function addTask() {
    const newTask = {
      id: Date.now(),
      title: taskInput,
      status: "pending",
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...existingTasks, newTask];

    console.log("<><><> line 24", existingTasks, updatedTasks)

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));


    setTaskList(updatedTasks);
    setTaskInput("");

    toast.success("Task Added", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  }

  const deleteTask = (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.error("Task Deleted", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const completeTask = (taskId) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: "completed" };
      }
      return task;
    });

    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    toast.success("Task Completed", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  useEffect(() => {
    function getTaskList() {
      const task_list = JSON.parse(localStorage.getItem("tasks")) || [];
      setTaskList(task_list);
    }

    getTaskList();
  }, []);

  const filteredTasks = taskList.filter((task) => {
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  console.log("<><><", filteredTasks)

  return (
    <>
      <h1 className="heading">Task Manager</h1>

      <div className="task-add-container">
        <input
          type="text"
          className="input"
          value={taskInput}
          onChange={(e) => handleInput(e.target.value)}
        />
        <button disabled={!taskInput} onClick={addTask}>
          Add Task
        </button>
        <ToastContainer />
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <div className="task-list-container">
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={task.id}>
              <span>
                {index + 1}. {task.title} - {task.status}
              </span>
              <div>
                <button
                  className="complete"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>
                <button className="delete" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
