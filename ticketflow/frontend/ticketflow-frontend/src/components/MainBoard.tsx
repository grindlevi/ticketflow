import { useEffect, useState } from "react"
import { Ticket } from "../utils/types"

const MainBoard = () => {
  const [tickets, setTickets] = useState<Ticket[] | []>([])

  useEffect(() => {
    const getTickets = async() => {
      const token = localStorage.getItem('jwt')
      const username = localStorage.getItem('username')
      try {
        const response: Response = await fetch(`/api/todos/${username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
  
        if(!response.ok){
          throw new Error("Fetching tickets failed.")
        }
  
        const tickets: Ticket[] | [] = await response.json()
        setTickets(tickets)
  
      } catch (error) {
        console.error('Error fetching tickets: ', error);
        
      }
    }
    getTickets()
  }, [])

  return (
    <div className="main-board">
      <h3>Your tickets</h3>
      <div className="tickets">
        {tickets && tickets.map((ticket: Ticket) =>(
          <div key={ticket.publicId}>
            <h4>{ticket.title}</h4>
            <h5>{ticket.description}</h5>
            <h5>{ticket.priority}</h5>
          </div>        
        ))}
      </div>
    </div>
  )
}

export default MainBoard