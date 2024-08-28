import { Ticket } from "../utils/types";
import "../css/ticket-component.css"

interface TicketComponentProps {
  ticket: Ticket,
  onDragStart: (e: React.DragEvent<HTMLDivElement>, ticket: Ticket) => void
}

const TicketComponent: React.FC<TicketComponentProps> = ({ ticket, onDragStart}) => {
  return (
    <div
    key={ticket.publicId}
    className="ticket"
    draggable={true}
    onDragStart={(e) => onDragStart(e, ticket)}
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
  )
}

export default TicketComponent