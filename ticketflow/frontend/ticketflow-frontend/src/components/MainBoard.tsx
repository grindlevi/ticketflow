import { Ticket } from "../utils/types";
import BoardContainer from "./BoardContainer";
import "../css/main-board.css";
import useTickets from "../hooks/useTickets";

interface MainBoardProps {
  username: string | null
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[] | []>>;
}

const MainBoard: React.FC<MainBoardProps> = ({ username, tickets, setTickets }) => {
  const {
    todoTickets,
    inProgressTickets,
    finishedTickets,
    handleSort,
    handleDragStart,
    handleDragOver,
    handleDrop
  } = useTickets(username, setTickets)

  return (
    <div className="main-board">
      <BoardContainer
        title="Backlog"
        tickets={tickets}
        containerName="backlog-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onSortByCreation={() => handleSort("creationDate", "backlog-container")}
        onSortByPriority={() => handleSort("priority", "backlog-container")}
      />
      <BoardContainer
        title="Todo"
        tickets={todoTickets}
        containerName="todo-drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onSortByCreation={() =>
          handleSort("creationDate", "todo-drop-container")
        }
        onSortByPriority={() => handleSort("priority", "todo-drop-container")}
      />
      <BoardContainer
        title="In Progress"
        tickets={inProgressTickets}
        containerName="in-progress-drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onSortByCreation={() =>
          handleSort("creationDate", "in-progress-drop-container")
        }
        onSortByPriority={() =>
          handleSort("priority", "in-progress-drop-container")
        }
      />
      <BoardContainer
        title="Finished 🎉"
        tickets={finishedTickets}
        containerName="finished-drop-container"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        onSortByCreation={() =>
          handleSort("creationDate", "finished-drop-container")
        }
        onSortByPriority={() =>
          handleSort("priority", "finished-drop-container")
        }
      />
    </div>
  );
};

export default MainBoard;
