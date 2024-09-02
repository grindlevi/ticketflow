import { Ticket } from "../utils/types";
import "../css/ticket-component.css"
import TicketStatus from "./TicketStatus";

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
    <TicketStatus ticket={ticket} />
  </div>
  )
}

export default TicketComponent