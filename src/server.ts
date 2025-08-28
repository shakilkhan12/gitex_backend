
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import mainRouter from "@/routes";
import { errorHandler } from "@/middlewares";

const app = express();
const PORT = 5000;

app.use(cors({ credentials: true, origin: process.env.CLIENT }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Khorfakkan Smart City API Documentation'
}));

// routes
app.get("/", (_req: Request, res: Response) => res.send("🚀 Welcome to the API "));
app.use('/api', mainRouter)
app.use(errorHandler)

const startServer = async () => {
    app.listen(PORT, () => {
      console.log(`🚀  Server ready at: http://localhost:${PORT}/`);
      console.log(`📚  API Documentation: http://localhost:${PORT}/api-docs`);
    });
};

startServer();
