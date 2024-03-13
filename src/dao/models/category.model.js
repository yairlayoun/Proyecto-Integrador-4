import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const categoryCollection = Category;

const categorySchema = new Schema({
  nombre: { type: String, required: true },
  esVisible: { type: Boolean, default: false },
});

const Category = model(categoryCollection, categorySchema);

export default Category;
