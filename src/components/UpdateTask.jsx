import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/task/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched Task:", data);
          if (data?.title && data?.description) {
            setTask(data);
          } else {
            console.error("Task data is incomplete");
          }
        })
        .catch((error) => console.error("Error fetching task:", error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Fields!",
        text: "Title and description cannot be empty.",
        confirmButtonText: "Okay",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:5000/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      const responseData = await response.json();
      console.log("Update Response:", responseData);

      if (!response.ok)
        throw new Error(responseData.message || "Failed to update task");

      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "Your task has been successfully updated.",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the task.",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading Task...</div>;
  }

  return (
    <div className="container mt-5 bg-black glass dark:bg-black dark:text-white rounded-3xl mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-5">
        <span className="text-white">Update</span>
        <span className="text-blue-500">Task</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-950"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-950"
            required
          />
        </div>
        <div>
          <label className="block text-white mb-2">Category</label>
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-950"
            required
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button
          type="submit"
          className="glass bg-black text-white p-2 flex mx-auto rounded-md dark:bg-gray-800 dark:text-gray-200"
          disabled={
            isSubmitting || !task.title.trim() || !task.description.trim()
          }
        >
          {isSubmitting ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
