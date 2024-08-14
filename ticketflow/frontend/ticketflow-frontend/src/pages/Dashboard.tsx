import AddTicketForm from "../components/AddTicketForm";
import MainBoard from "../components/MainBoard";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard-main">
        <h1>Dashboard</h1>
      <AddTicketForm />
      <MainBoard />
      </div>
    </>
  );
};

export default Dashboard;
