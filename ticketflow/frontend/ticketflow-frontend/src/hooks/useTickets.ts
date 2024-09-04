import { useState, useEffect } from "react";
import { Ticket } from "../utils/types";
import { Container } from "../utils/enums";

const useTickets = (username: string | null, setTickets: React.Dispatch<React.SetStateAction<Ticket[] | []>> ) => {
  const [draggedItem, setDraggedItem] = useState<Ticket | null>(null);
  const [todoTickets, setTodoTickets] = useState<Ticket[]>([]);
  const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
  const [finishedTickets, setFinishedTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const getTickets = async () => {
      const token = localStorage.getItem("jwt");
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

        const renderTickets = (tickets: Ticket[]) => {
          const backlogTickets = tickets.filter((ticket) => ticket.todoContainer === Container.BACKLOG)
          const todoTickets = tickets.filter((ticket) => ticket.todoContainer === Container.TODO)
          const inProgressTickets = tickets.filter((ticket) => ticket.todoContainer === Container.IN_PROGRESS)
          const finishedTickets = tickets.filter((ticket) => ticket.todoContainer === Container.FINISHED)
      
          setTickets(backlogTickets)
          setTodoTickets(todoTickets)
          setInProgressTickets(inProgressTickets)
          setFinishedTickets(finishedTickets)
        }

        renderTickets(tickets)
        console.log(tickets);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
      }
    };
    getTickets();
  }, [username, setTickets]);

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
        setTickets(
          sortedTickets.filter(
            (ticket: Ticket) => ticket.todoContainer === Container.BACKLOG
          )
        );
        break;
      case "todo-drop-container":
        setTodoTickets(
          sortedTickets.filter(
            (ticket: Ticket) => ticket.todoContainer === Container.TODO
          )
        );
        break;
      case "in-progress-drop-container":
        setInProgressTickets(
          sortedTickets.filter(
            (ticket: Ticket) => ticket.todoContainer === Container.IN_PROGRESS
          )
        );
        break;
      case "finished-drop-container":
        setFinishedTickets(
          sortedTickets.filter(
            (ticket: Ticket) => ticket.todoContainer === Container.FINISHED
          )
        );
        break;
      default:
        throw new Error("Container doesnt exist.");
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ticket: Ticket) => {
    if (e.target instanceof HTMLDivElement) {
      setDraggedItem(ticket);
      console.log("drag started", draggedItem);
    }
  };

  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, className: string): void {
    e.preventDefault();
  
    if (draggedItem) {
      const updatedTicket: Ticket = {
        ...draggedItem,
        todoContainer: getContainerFromClassName(className),
        isCompleted: className.includes("finished-drop-container"),
      };
  
      updateTicketState(updatedTicket);
  
      updateTicketStatus(updatedTicket);
  
      setDraggedItem(null);
    }
  }
  
  function getContainerFromClassName(className: string): Container {
    switch (className) {
      case "backlog-container":
        return Container.BACKLOG;
      case "todo-drop-container":
        return Container.TODO;
      case "in-progress-drop-container":
        return Container.IN_PROGRESS;
      case "finished-drop-container":
        return Container.FINISHED;
      default:
        throw new Error("Invalid container name");
    }
  }
  
  function updateTicketState(updatedTicket: Ticket) {
    const updateList = (tickets: Ticket[], updatedTicket: Ticket) =>
      tickets.map(ticket =>
        ticket.publicId === updatedTicket.publicId ? updatedTicket : ticket
      );
  
      setTickets((prevTickets: Ticket[]): Ticket[] =>
        updatedTicket.todoContainer === Container.BACKLOG
          ? updateList(prevTickets, updatedTicket)
          : prevTickets.filter(ticket => ticket.publicId !== updatedTicket.publicId)
      );
  
    setTodoTickets(prevTickets =>
      updatedTicket.todoContainer === Container.TODO
        ? updateList(prevTickets, updatedTicket)
        : prevTickets.filter(ticket => ticket.publicId !== updatedTicket.publicId)
    );
  
    setInProgressTickets(prevTickets =>
      updatedTicket.todoContainer === Container.IN_PROGRESS
        ? updateList(prevTickets, updatedTicket)
        : prevTickets.filter(ticket => ticket.publicId !== updatedTicket.publicId)
    );
  
    setFinishedTickets(prevTickets =>
      updatedTicket.todoContainer === Container.FINISHED
        ? updateList(prevTickets, updatedTicket)
        : prevTickets.filter(ticket => ticket.publicId !== updatedTicket.publicId)
    );
  
    if (updatedTicket.todoContainer === Container.BACKLOG) {
      setTickets((prevTickets: Ticket[]) => [...prevTickets, updatedTicket]);
    } else if (updatedTicket.todoContainer === Container.TODO) {
      setTodoTickets(prevTickets => [...prevTickets, updatedTicket]);
    } else if (updatedTicket.todoContainer === Container.IN_PROGRESS) {
      setInProgressTickets(prevTickets => [...prevTickets, updatedTicket]);
    } else if (updatedTicket.todoContainer === Container.FINISHED) {
      setFinishedTickets(prevTickets => [...prevTickets, updatedTicket]);
    }
  }
  
  async function updateTicketStatus(ticket: Ticket) {
    const jwt = localStorage.getItem("jwt");
  
    try {
      const response = await fetch("/api/todos", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update ticket status");
      }
      console.log("Ticket status updated successfully:", ticket);
  
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  }

  return {
    todoTickets,
    inProgressTickets,
    finishedTickets,
    handleSort,
    handleDragStart,
    handleDragOver,
    handleDrop
  }
};

export default useTickets;