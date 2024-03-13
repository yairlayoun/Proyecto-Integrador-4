// ticketsService.js
import Ticket from '../dao/models/ticket.model.js'; // Importar el modelo de Ticket definido con Mongoose

export const createTicket = async (ticketData) => {
  try {
    const createdTicket = await Ticket.create(ticketData);
    return createdTicket;
  } catch (error) {
    throw new Error('Error al crear el ticket', error);
  }
};