import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productsSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  categoria: { type: Schema.Types.ObjectId, ref: 'Category' },
  esVisible: { type: Boolean, default: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: 'admin', 
    required: true
  },
});

const Products = model('Products', productsSchema);

export default Products;
