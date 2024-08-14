import { useState } from "react";
import AddTicketForm from "../components/AddTicketForm";
import MainBoard from "../components/MainBoard";
import Modal from "../components/Modal";
const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="dashboard-main">
        <h1>Dashboard</h1>
        <div className="addTicket">
          <button type="button" onClick={toggleModal}>+</button>
        </div>
        <MainBoard />
        <Modal show={showModal} onClose={toggleModal}>
          <AddTicketForm />
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
