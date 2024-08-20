import { Ticket } from "../utils/types";
import "../css/mainboard.css";

interface MainBoardProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[] | []>>;
}

const MainBoard: React.FC<MainBoardProps> = ({ tickets, setTickets }) => {
  async function handleSort(criteria: string) {
    const username: string = localStorage.getItem("username")!;
    const jwt: string = localStorage.getItem("jwt")!;
    try {
      const response: Response = await fetch(
        `/api/todos/${username}/${criteria}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetching sorted tickets failed.");
      }

      const sortedTickets: Ticket[] | [] = await response.json();
      setTickets(sortedTickets);
    } catch (error) {
      console.error("An error occured during fetching sorted tickets");
    }
  }

  return (
    <div className="main-board">
      <h3>Your tickets</h3>
      <div className="tickets">
        <div className="button-sort-by-creation-div">
          <span className="button-sort-by-creation-tooltip-text">
            Sort tickets by creation date
          </span>
          <button
            className="sort-by-creation-button"
            onClick={() => handleSort("creationDate")}
          >
            📅
          </button>
        </div>
        <div className="button-sort-by-priority-div">
          <span className="button-sort-by-priority-tooltip-text">
            Sort tickets by priority
          </span>
          <button
            className="sort-by-priority-button"
            onClick={() => handleSort("priority")}
          >
            📢
          </button>
        </div>
        {tickets.length === 0 ? (
          <p>No tickets available</p>
        ) : (
          tickets &&
          tickets.map((ticket: Ticket) => (
            <div key={ticket.publicId} className="ticket" draggable={true}>
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <div className="ticket-status">
                <span className="ticket-iscompleted-tooltip-text">
                  {ticket.isCompleted ? "Completed" : "In progress"}  
                </span>
                <h5 className={ticket.isCompleted ? "ticket-status-completed" : "ticket-status-in-progress"}>
                  Status: {ticket.isCompleted ? "✅" : "❌"}
                </h5>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainBoard;
