import { useContext, useState, useEffect } from "react";
import AuthContext from "./Auth/Authcontext";
import { FaSun, FaMoon } from "react-icons/fa"; // Light and Dark mode icons

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  // Set the theme based on the saved preference or default to light mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    }
  }, []);

  // Toggle dark mode and save the preference to localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save the mode in localStorage
      return newMode;
    });
  };

  // Apply dark mode classes globally to the entire website
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("successful sign out");
      })
      .catch((error) => {
        console.log("failed to sign out. stay here. don't leave me alone");
      });
  };

  return (
    <nav className="bg-white dark:bg-black dark:text-white py-3 px-5 flex justify-between items-center transition-all">
      <h1 className="text-xl font-semibold">
        <span className="font-bold text-4xl text-blue-800">Task</span>Flow
      </h1>

      <div className="flex items-center">
        <button onClick={toggleDarkMode} className="mr-4 text-xl transition">
          {darkMode ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-800" />
          )}
        </button>

        <button
          onClick={handleSignOut}
          className="bg-red-800 hover:bg-red-950 text-white px-4 uppercase py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
