import { useEffect, useState } from "react";

import AddTicketForm from "../components/AddTicketForm";
import MainBoard from "../components/MainBoard";
import Modal from "../components/Modal";
import { Ticket } from "../utils/types";

import '../css/dashboard.css'
import '../css/add-ticket-button.css'
import SignOutButton from "../components/SignOutButton";

const Dashboard = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[] | []>([]);
  const [username, setUsername] = useState<string | null>(null)

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const handleAddTicket = (newTicket: Ticket) => {
    setTickets([...tickets, newTicket]);
  };

  useEffect(() => {
    const getTickets = async () => {
      const token = localStorage.getItem("jwt");
      const username = localStorage.getItem("username");
      setUsername(username)
      try {
        const response: Response = await fetch(`/api/todos/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fetching tickets failed.");
        }

        const tickets: Ticket[] | [] = await response.json();
        setTickets(tickets);
        console.log(tickets);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      }
    };
    getTickets();
  }, []);

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
        <MainBoard tickets={tickets} setTickets={setTickets} />
        <Modal show={showModal} onClose={toggleModal}>
          <AddTicketForm onFormSubmit={handleAddTicket} />
        </Modal>
        <SignOutButton />
      </div>
    </>
  );
};

export default Dashboard;
