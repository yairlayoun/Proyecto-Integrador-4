// ticket.model.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchaseDatetime: { type: Date, required: true },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
