import { Ticket } from "../utils/types";

interface MainBoardProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[] | []>>
}

const MainBoard: React.FC<MainBoardProps> = ({ tickets, setTickets }) => {

  async function handleSort(criteria: string) {
    const username: string = localStorage.getItem('username')!
    const jwt: string = localStorage.getItem('jwt')!
    try {
      const response: Response = await fetch(`/api/todos/${username}/${criteria}`, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
      if(!response.ok){
        throw new Error('Fetching sorted tickets failed.')
      }

      const sortedTickets: Ticket[] | [] = await response.json()
      setTickets(sortedTickets)
      
    } catch (error) {
      console.error("An error occured during fetching sorted tickets");
      
    }
  }

  return (
    <div className="main-board">
      <h3>Your tickets</h3>
      <div className="tickets">
        <button className="sort-by-date" onClick={() => handleSort("creationDate")}>
          📅
        </button>
        <button className="sort-by-priority" onClick={() => handleSort("priority")}>
          📢
        </button>
        {tickets.length === 0 ? (
          <p>No tickets available</p>
        ) : (
          tickets &&
          tickets.map((ticket: Ticket) => (
            <div key={ticket.publicId} className="ticket" draggable={true}>
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <h5>Status: {ticket.isCompleted ? "✅" : "❌"}</h5>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainBoard;
