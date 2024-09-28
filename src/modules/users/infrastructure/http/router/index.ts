import { Router } from "express";
import { Controller } from "../../../../../shared/domain/controller";
import { container } from "../../../shared/di.container";
import { Locator } from "../../../shared/di.enums";
import main from "../../../../../shared/infrastructure/http/controllers";
import { authorize } from "../../../../../shared/infrastructure/http/middlewares/auth";

const createUser = container.get<Controller>(Locator.CreateUserController);
const updateUser = container.get<Controller>(Locator.UpdateUserController);
const report = container.get<Controller>(Locator.ReportController);

const usersRouter = Router();

usersRouter.post("/", main(createUser));
usersRouter.patch("/:id", authorize, main(updateUser));
usersRouter.get("/report", authorize, main(report));

export { usersRouter };
