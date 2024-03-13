import supertest from 'supertest';
import chai from 'chai';
import app from "../app.js"
import { setupDatabase, clearDatabase } from "../middleware/test/test_utility.js";

const expect = chai.expect;
const request = supertest(app);

before(async () => {
    // Configurar la base de datos de prueba si es necesario
    await setupDatabase();
  });
  
  after(async () => {
    // Limpiar la base de datos de prueba después de las pruebas
    await clearDatabase();
  });
  
  describe('Carts Router', () => {
    it('should get all carts', async () => {
      const response = await request.get('/api/carts');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      // Agrega más validaciones según la estructura de tu respuesta esperada
    });
  
    it('should get a cart by ID', async () => {
      // Supongamos que tienes un ID válido de carrito en tu base de datos
      const cartId = 'tu_id_de_prueba';
      const response = await request.get(`/api/carts/${cartId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // Agrega más validaciones según la estructura de tu respuesta esperada
    });
  
    it('should create a new cart', async () => {
      const response = await request.post('/api/carts');
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      // Agrega más validaciones según la estructura de tu respuesta esperada y verifica que el carrito se haya creado correctamente en la base de datos
    });
  
    it('should add a product to a cart', async () => {
      // Supongamos que tienes IDs válidos de carrito y producto en tu base de datos
      const cartId = 'tu_id_de_prueba_cart';
      const productId = 'tu_id_de_prueba_producto';
      const response = await request.post(`/api/carts/${cartId}/add-product/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // Agrega más validaciones según la estructura de tu respuesta esperada y verifica que el producto se haya agregado correctamente al carrito en la base de datos
    });
  
  });