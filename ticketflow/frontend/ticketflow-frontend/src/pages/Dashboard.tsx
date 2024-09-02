import { useState } from "react";

import AddTicketForm from "../components/AddTicketForm";
import MainBoard from "../components/MainBoard";
import Modal from "../components/Modal";
import { Ticket } from "../utils/types";

import '../css/dashboard.css'
import '../css/add-ticket-button.css'
import SignOutButton from "../components/SignOutButton";

const Dashboard = () => {
  const username = localStorage.getItem("username")

  const [showModal, setShowModal] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  //const [username, setUsername] = useState<string | null>(null)

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const handleAddTicket = (newTicket: Ticket) => {
    setTickets([...tickets, newTicket]);
  };

  return (
    <>
      <div className="dashboard-main">
        <h1 className="dashboard-greeting">{`Nice to have you here, ${username}!`}</h1>
        <div className="add-ticket-container">
          <span className="add-ticket-tooltip-text">Add a new ticket</span>
          <button className="add-ticket-button" type="button" onClick={toggleModal}>
            +
          </button>
        </div>
        <MainBoard tickets={tickets} setTickets={setTickets} username={username}/>
        <Modal show={showModal} onClose={toggleModal}>
          <AddTicketForm onFormSubmit={handleAddTicket} />
        </Modal>
        <SignOutButton />
      </div>
    </>
  );
};

export default Dashboard;
