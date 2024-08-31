import { Ticket } from "../utils/types";
import SortButton from "./SortButton";
import TicketComponent from "./TicketComponent";
import "../css/main-board.css";

interface BoardContainerProps {
  title: string;
  tickets: Ticket[];
  containerName: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>, containerName: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, ticket: Ticket) => void;
  onSortByCreation: () => void;
  onSortByPriority: () => void;
}

const BoardContainer: React.FC<BoardContainerProps> = ({
  title,
  tickets,
  containerName,
  onDrop,
  onDragOver,
  onDragStart,
  onSortByCreation,
  onSortByPriority,
}) => {
  return (
    <div
      className={containerName}
      onDrop={(e) => onDrop(e, containerName)}
      onDragOver={onDragOver}
    >
      <h3>{title}</h3>
      <div className="sort-button-container">
      <SortButton
        spanClassName="button-sort-by-creation-tooltip-text"
        tooltipText="Sort tickets by creation date"
        onClick={onSortByCreation}
        buttonLabel="📅"
      />
      <SortButton
        spanClassName="button-sort-by-priority-tooltip-text"
        tooltipText="Sort tickets by priority"
        onClick={onSortByPriority}
        buttonLabel="📢"
      />
      </div>
      {tickets &&
        tickets.map((ticket: Ticket) => (
          <TicketComponent key={ticket.publicId} ticket={ticket} onDragStart={onDragStart} />
        ))}
    </div>
  );
};

export default BoardContainer