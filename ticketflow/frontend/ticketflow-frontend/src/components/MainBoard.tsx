import { Ticket } from "../utils/types";
import "../css/mainboard.css";
import { DragEvent, useState } from "react";
import { Container } from "../utils/enums";

interface MainBoardProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[] | []>>;
}

const MainBoard: React.FC<MainBoardProps> = ({ tickets, setTickets }) => {
  const [draggedItem, setDraggedItem] = useState<Ticket | null>(null);
  const [todoTickets, setTodoTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [finishedTickets, setFinishedTickets] = useState<Ticket[]>([]);

  async function handleSort(criteria: string, containerName: string) {
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

      renderSortedTickets(sortedTickets, containerName);
    } catch (error) {
      console.error("An error occured during fetching sorted tickets");
    }
  }

  const renderSortedTickets = (
    sortedTickets: Ticket[],
    containerName: string
  ) => {
    switch (containerName) {
      case "backlog-container":
        setTickets(sortedTickets.filter((ticket: Ticket) => ticket.todoContainer === Container.BACKLOG));
        break;
      case "todo-drop-container":
        setTodoTickets(sortedTickets.filter((ticket: Ticket) => ticket.todoContainer === Container.TODO));
        break;
      case "in-progress-drop-container":
        setInProgressTickets(sortedTickets.filter((ticket: Ticket) => ticket.todoContainer === Container.IN_PROGRESS));
        break;
      case "finished-drop-container":
        setFinishedTickets(sortedTickets.filter((ticket: Ticket) => ticket.todoContainer === Container.FINISHED));
        break;
      default:
        throw new Error("Container doesnt exist.");
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, ticket: Ticket) => {
    if (e.target instanceof HTMLDivElement) {
      setDraggedItem(ticket);
      console.log("drag started", draggedItem);
    }
  };

  function handleDragOver(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function handleDrop(e: DragEvent<HTMLDivElement>, className: string): void {
    e.preventDefault();
    console.log("item dropped", e.target, className);

    updateTicketStatus(draggedItem!, className);

    if (draggedItem) {
      if (tickets.includes(draggedItem)) {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket !== draggedItem)
        );
      }
      if (todoTickets.includes(draggedItem)) {
        setTodoTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket !== draggedItem)
        );
      }
      if (inProgressTickets.includes(draggedItem)) {
        setInProgressTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket !== draggedItem)
        );
      }
      if (finishedTickets.includes(draggedItem)) {
        setFinishedTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket !== draggedItem)
        );
      }

      if (className.includes("backlog-container")) {
        setTickets((prevTickets) => [...prevTickets, draggedItem]);
      }
      if (className.includes("todo-drop-container")) {
        setTodoTickets((prevTickets) => [...prevTickets, draggedItem]);
      }
      if (className.includes("in-progress-drop-container")) {
        setInProgressTickets((prevTickets) => [...prevTickets, draggedItem]);
      }
      if (className.includes("finished-drop-container")) {
        setFinishedTickets((prevTickets) => [...prevTickets, draggedItem]);
      }
      setDraggedItem(null);
    }
  }

  const updateTicketStatus = async (ticket: Ticket, containerName: string) => {
    const jwt = localStorage.getItem("jwt");
    const username = localStorage.getItem("username")

    let container: Container
    switch(containerName){
      case 'backlog-container': container = Container.BACKLOG
      break
      case 'todo-drop-container': container = Container.TODO
      break
      case 'in-progress-drop-container': container = Container.IN_PROGRESS
      break
      case 'finished-drop-container': container = Container.FINISHED
      break
      default: throw new Error('Invalid container name')
    }

    const upDatedTicket: Ticket = {
      publicId: ticket.publicId,
      title: ticket.title,
      description: ticket.description,
      username: username,
      priority: ticket.priority,
      isCompleted: ticket.isCompleted,
      todoContainer: container,
    };

    console.log(upDatedTicket);

    try {
      const response = await fetch("/api/todos", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upDatedTicket),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-board">
      <div
        className="backlog-container"
        onDrop={(e) => handleDrop(e, "backlog-container")}
        onDragOver={(e) => handleDragOver(e)}
      >
        <h3>Backlog</h3>
        <div className="button-sort-by-creation-div">
          <span className="button-sort-by-creation-tooltip-text">
            Sort tickets by creation date
          </span>
          <button
            className="sort-by-creation-button"
            onClick={() => handleSort("creationDate", "backlog-container")}
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
            onClick={() => handleSort("priority", "backlog-container")}
          >
            📢
          </button>
        </div>

        {tickets &&
          tickets.map((ticket: Ticket) => (
            <div
              key={ticket.publicId}
              className="ticket"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, ticket)}
            >
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <div className="ticket-status">
                <span className="ticket-iscompleted-tooltip-text">
                  {ticket.isCompleted ? "Completed" : "In progress"}
                </span>
                <h5
                  className={
                    ticket.isCompleted
                      ? "ticket-status-completed"
                      : "ticket-status-in-progress"
                  }
                >
                  Status: {ticket.isCompleted ? "✅" : "❌"}
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div
        className="todo-drop-container"
        onDrop={(e) => handleDrop(e, "todo-drop-container")}
        onDragOver={(e) => handleDragOver(e)}
      >
        <h3>Todo</h3>
        <div className="button-sort-by-creation-div">
          <span className="button-sort-by-creation-tooltip-text">
            Sort tickets by creation date
          </span>
          <button
            className="sort-by-creation-button"
            onClick={() => handleSort("creationDate", "todo-drop-container")}
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
            onClick={() => handleSort("priority", "todo-drop-container")}
          >
            📢
          </button>
        </div>
        {todoTickets &&
          todoTickets.map((ticket: Ticket) => (
            <div
              key={ticket.publicId}
              className="ticket"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, ticket)}
            >
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <div className="ticket-status">
                <span className="ticket-iscompleted-tooltip-text">
                  {ticket.isCompleted ? "Completed" : "In progress"}
                </span>
                <h5
                  className={
                    ticket.isCompleted
                      ? "ticket-status-completed"
                      : "ticket-status-in-progress"
                  }
                >
                  Status: {ticket.isCompleted ? "✅" : "❌"}
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div
        className="in-progress-drop-container"
        onDrop={(e) => handleDrop(e, "in-progress-drop-container")}
        onDragOver={(e) => handleDragOver(e)}
      >
        <h3>In Progress</h3>
        <div className="button-sort-by-creation-div">
          <span className="button-sort-by-creation-tooltip-text">
            Sort tickets by creation date
          </span>
          <button
            className="sort-by-creation-button"
            onClick={() =>
              handleSort("creationDate", "in-progress-drop-container")
            }
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
            onClick={() => handleSort("priority", "in-progress-drop-container")}
          >
            📢
          </button>
        </div>
        {inProgressTickets &&
          inProgressTickets.map((ticket: Ticket) => (
            <div
              key={ticket.publicId}
              className="ticket"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, ticket)}
            >
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <div className="ticket-status">
                <span className="ticket-iscompleted-tooltip-text">
                  {ticket.isCompleted ? "Completed" : "In progress"}
                </span>
                <h5
                  className={
                    ticket.isCompleted
                      ? "ticket-status-completed"
                      : "ticket-status-in-progress"
                  }
                >
                  Status: {ticket.isCompleted ? "✅" : "❌"}
                </h5>
              </div>
            </div>
          ))}
      </div>
      <div
        className="finished-drop-container"
        onDrop={(e) => handleDrop(e, "finished-drop-container")}
        onDragOver={(e) => handleDragOver(e)}
      >
        <h3>Finished🎉</h3>
        <div className="button-sort-by-creation-div">
          <span className="button-sort-by-creation-tooltip-text">
            Sort tickets by creation date
          </span>
          <button
            className="sort-by-creation-button"
            onClick={() =>
              handleSort("creationDate", "finished-drop-container")
            }
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
            onClick={() => handleSort("priority", "finished-drop-container")}
          >
            📢
          </button>
        </div>
        {finishedTickets &&
          finishedTickets.map((ticket: Ticket) => (
            <div
              key={ticket.publicId}
              className="ticket"
              draggable={true}
              onDragStart={(e) => handleDragStart(e, ticket)}
            >
              <h4>Title: {ticket.title}</h4>
              <h5>Task: {ticket.description}</h5>
              <h5>Priority: {ticket.priority}</h5>
              <div className="ticket-status">
                <span className="ticket-iscompleted-tooltip-text">
                  {ticket.isCompleted ? "Completed" : "In progress"}
                </span>
                <h5
                  className={
                    ticket.isCompleted
                      ? "ticket-status-completed"
                      : "ticket-status-in-progress"
                  }
                >
                  Status: {ticket.isCompleted ? "✅" : "❌"}
                </h5>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainBoard;
