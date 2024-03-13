import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
  IdUsuario: { type: mongoose.Schema.Types.ObjectId, required: true },
  productos: [{
    id: {type: Number, required:true},
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0, required: true },
  }],
  esVisible: { type: Boolean, default: false },
});

const Cart = model('Cart', cartSchema);

export default Cart;
