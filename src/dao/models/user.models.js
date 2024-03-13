import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userCollection = 'User';

const documentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'premium'],
    default: 'user',
  },
  documents: [documentSchema], // Nueva propiedad para almacenar documentos
    last_connection: {
        type: Date,
        default: Date.now
  },
});

userSchema.methods.updateLastConnection = async function() {
  this.last_connection = new Date();
  await this.save();
};

const user = model(userCollection, userSchema);

export default user;
