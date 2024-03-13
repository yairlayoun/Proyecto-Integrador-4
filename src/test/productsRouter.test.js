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
  
  describe('Products Router', () => {
    it('should get all products', async () => {
      const response = await request.get('/api/products');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');

    });
  
    it('should get a product by ID', async () => {
      // Supongamos que tienes un ID válido de producto en tu base de datos
      const productId = 'tu_id_de_prueba';
      const response = await request.get(`/api/products/${productId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');

    });
  
    it('should add a new product', async () => {
      const newProduct = {
        // Define los datos necesarios para agregar un nuevo producto
      };
      const response = await request.post('/api/products').send(newProduct);
      expect(response.status).to.equal(201);
      expect(response.body).to.be.an('object');
      // Agrega más validaciones según la estructura de tu respuesta esperada y verifica que el producto se haya agregado correctamente en la base de datos
    });


});