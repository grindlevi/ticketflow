import { FormEvent, useState } from "react";
import { Priority } from "../utils/enums";

const AddTicketForm = () => {
  const [ticketFormData, setTicketFormData] = useState({
    title: "",
    description: "",
    username: localStorage.getItem("username"),
    priority: Priority,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setTicketFormData({
      ...ticketFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(ticketFormData);

    const token = localStorage.getItem("jwt");
    try {
      const response: Response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketFormData),
      });
      if(!response.ok) {
        throw new Error('Failed to add ticket')
      }
      setTicketFormData({
        title: "",
        description: "",
        username: localStorage.getItem('username'),
        priority: Priority
      }

      )
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addTicket">
        <form onSubmit={handleSubmit}>
          <div className="title">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={ticketFormData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              value={ticketFormData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="priority">
            <label htmlFor="priority">Priority</label>
            <select name="priority" id="priority" onChange={handleInputChange}>
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>
          </div>
          <div className="submitTicket">
            <button>Submit</button>
          </div>
        </form>
      </div>
  )
}

export default AddTicketForm