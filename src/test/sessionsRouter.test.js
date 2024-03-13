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
  
  describe('Sessions Router', () => {
    it('should log in a user', async () => {
      // Supongamos que tienes un usuario de prueba con credenciales válidas en tu base de datos
      const userData = {
        username: 'tu_usuario_de_prueba',
        password: 'tu_contraseña_de_prueba',
      };
  
      const response = await request.post('/api/sessions/login').send(userData);
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      // Agrega más validaciones según la estructura de tu respuesta esperada y verifica que el usuario se haya autenticado correctamente
    });
  
  });