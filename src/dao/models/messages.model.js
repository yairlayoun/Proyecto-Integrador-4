import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const messagesCollection = Messages;

const messagesSchema = new Schema({
  usuario: { type: String, required: true },
  mensaje: { type: String, required: true },
});

const Messages = model(messagesCollection, messagesSchema);

export default Messages;
