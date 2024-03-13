import express from "express";
import { db } from "./config/db.config.js";
import authRouter from "./routes/auth.router.js";
import { passportCall } from "./utils/utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cors from "cors";
import generateMockProducts from "./utils/mock.util.js";
import { addLogger } from "./middleware/logger/logger.middleware.js";
import { setupSwagger } from './swagger/swagger.js';
import { setupProductSwagger } from "./swagger/products/swagger.js";
import swaggerUi from 'swagger-ui-express';
import { setupCartSwagger } from "./swagger/cart/swagger.js";

const app = express();
app.listen(8080, () => console.log("Listening on 8080"));

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.static("./public"));

app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use("/api", authRouter);

app.use(addLogger)

const swaggerSpec = setupSwagger(app);

setupSwagger(app);
setupProductSwagger(app);
setupCartSwagger(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
  res.send({ mensaje: "Respuesta" });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/current", passportCall("jwt"), (req, res) => {
  res.send(req.user);
});

app.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});

