import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cron from "node-cron";
import cors from "cors";
import logger from "./shared/infrastructure/logger";
import { container } from "./modules/genres/shared/di.container";
import { Locator } from "./modules/genres/shared/di.enums";
import { IController } from "./shared/domain/controller";
import { packagesRoute } from "./modules/packages/infrastructure/http/router";
import { subscriptionsRoute } from "./modules/subscriptions/infrastructure/http/router";
import { moviesRouter } from "./modules/movies/infrastructure/http/router";
import swagger from "swagger-ui-express";
import swaggerFile from "../swagger.json";
import { usersRouter } from "./modules/users/infrastructure/http/router";
import { authRouter } from "./modules/auth/infrastructure/http/router";
import { genresRoute } from "./modules/genres/infrastructure/http/router";
const extractGenres = container.get<IController<void, void>>(
  Locator.ExtractGenresController
);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/docs", swagger.serve, swagger.setup(swaggerFile));

async function createRouter() {
  app.use("/", authRouter);
  app.use("/users", usersRouter);
  app.use("/genres", genresRoute);
  app.use("/packages", packagesRoute);
  app.use("/subscriptions", subscriptionsRoute);
  app.use("/movies", moviesRouter);
}

createRouter();

app.listen(process.env.API_PORT, async () => {
  logger.info(`Server Running on port ${process.env.API_PORT}`);
  await extractGenres.execute();
});

cron.schedule(String(process.env.CRON_JOB), async () => {
  await extractGenres.execute();
});
