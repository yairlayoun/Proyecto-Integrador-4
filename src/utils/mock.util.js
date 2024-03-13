import { faker } from "@faker-js/faker";

// const faker = new Faker("es");

const generateUsers = (numUsers) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(generateUser());
  }
  return users;
};

const generateUser = () => {
  const numOfProducts = faker.random.numeric(1, { bannedDigits: ["0"] });

  const products = [];
  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProducts());
  }

  return {
    name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    image: faker.internet.avatar(),
    // role: faker.helpers.arrayElement(['cliente', 'vendedor']),
    // role: "vendedor",
    job: faker.name.jobType(),
    title: faker.name.jobTitle(),
    product: products,
  };
};

// Función para generar productos de manera simulada
const generateMockProducts = () => {
  const mockProducts = [];

  for (let i = 0; i < 100; i++) {
    const product = {
      _id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    };

    mockProducts.push(product);
  }

  return mockProducts;
};

 

export default generateMockProducts; generateUsers;
