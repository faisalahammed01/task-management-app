import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Task from "../components/Task";
import TaskBoard from "../components/TaskBoard";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <Task></Task>
      <TaskBoard></TaskBoard>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
