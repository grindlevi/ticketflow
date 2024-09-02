import { Ticket } from "../utils/types"

interface TicketStatusProps {
  ticket: Ticket;
}

const TicketStatus: React.FC<TicketStatusProps> = ({ ticket }) => {

  const getTicketStatusIcon = (): string => {
    switch (ticket.todoContainer) {
      case 'BACKLOG': return '❌'
      case 'TODO': return '❗'
      case 'IN_PROGRESS': return '🌠'
      case 'FINISHED': return '✅'
      default:
        return 'Error loading icon'
    }
  }

  return (
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
      Status: {getTicketStatusIcon()}
    </h5>
    <p>{ticket.todoContainer}</p>
  </div>
  )
}

export default TicketStatus