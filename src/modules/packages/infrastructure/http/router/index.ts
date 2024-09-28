import { Router } from "express";
import { Controller } from "../../../../../shared/domain/controller";
import { container } from "../../../shared/di.container";
import { Locator } from "../../../shared/di.enums";
import main from "../../../../../shared/infrastructure/http/controllers";
import { authorize } from "../../../../../shared/infrastructure/http/middlewares/auth";

const createPackage = container.get<Controller>(
  Locator.CreatePackageController
);

const packagesRoute = Router();

packagesRoute.post("/", authorize, main(createPackage));

export { packagesRoute };
