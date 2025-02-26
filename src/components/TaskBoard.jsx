import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import io from "socket.io-client";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const socket = io("https://task-management-servre.onrender.com");

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          "https://task-management-servre.onrender.com/task"
        );
        const data = await res.json();
        setTasks(data);
      } catch {
        setError("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();

    socket.on("newTask", (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id
            ? { ...task, category: updatedTask.category }
            : task
        )
      );
    });

    socket.on("taskDeleted", (deletedTask) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTask._id)
      );
    });

    return () => {
      socket.off("newTask");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find(
        (task) => task._id === result.draggableId
      );

      if (!taskToMove) return prevTasks;

      const updatedTask = { ...taskToMove, category: destination.droppableId };

      const updatedTasks = prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );

      return updatedTasks;
    });

    try {
      await fetch(
        `https://task-management-servre.onrender.com/task/${result.draggableId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: destination.droppableId }),
        }
      );

      socket.emit("updateTask", {
        _id: result.draggableId,
        category: destination.droppableId,
      });
    } catch {
      setError("Error updating task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://task-management-servre.onrender.com/task/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== id));

      socket.emit("deleteTask", id);
    } catch {
      setError("Error deleting task. Please try again.");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto p-4">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["To-Do", "In Progress", "Done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-black p-4 rounded-lg shadow-lg border-4 ${
                    status === "To-Do"
                      ? "border-blue-600"
                      : status === "In Progress"
                      ? "border-yellow-600"
                      : "border-green-600"
                  }`}
                >
                  <h2 className="text-lg font-semibold mb-3 text-white">
                    {status}
                  </h2>
                  {tasks
                    .filter((task) => task.category === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-md shadow-md mb-3 border flex flex-col space-y-2"
                          >
                            <h3 className="font-medium text-gray-800">
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {task.description}
                            </p>
                            <small className="text-xs text-gray-500">
                              {task.timestamp}
                            </small>
                            <div className="flex justify-end space-x-2 mt-3">
                              <Link
                                to={`/update/${task._id}`}
                                className="text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                              >
                                <FiEdit2 size={20} />
                              </Link>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="text-red-500 hover:text-red-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                              >
                                <FiTrash2 size={20} />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}
