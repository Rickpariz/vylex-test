import { Router } from "express";
import { Controller } from "../../../../../shared/domain/controller";
import { container } from "../../../shared/di.container";
import main from "../../../../../shared/infrastructure/http/controllers";
import { authorize } from "../../../../../shared/infrastructure/http/middlewares/auth";
import { Locator } from "../../../shared/di.enum";

const createSubscription = container.get<Controller>(
  Locator.CreateSubscriptionController
);

const subscriptionsRoute = Router();

subscriptionsRoute.post("/", authorize, main(createSubscription));

export { subscriptionsRoute };
