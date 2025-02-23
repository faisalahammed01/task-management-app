const Navbar = () => {
  return (
    <nav className="bg-black glass text-white py-3 px-5 flex justify-between items-center">
      <h1 className="text-xl font-semibold">
        <span className="font-bold text-4xl text-blue-800">Task</span>Flow
      </h1>

      <button className="bg-red-800 hover:bg-red-950 text-white px-4 uppercase py-2 rounded-md transition">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
