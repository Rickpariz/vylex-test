import { Router } from "express";
import { container } from "../../../shared/di.container";
import { Controller } from "../../../../../shared/domain/controller";
import { Locator } from "../../../shared/di.enums";
import main from "../../../../../shared/infrastructure/http/controllers";

const signIn = container.get<Controller>(Locator.SignInController);
const requestPasswordReset = container.get<Controller>(
  Locator.RequestPasswordResetController
);
const resetPassword = container.get<Controller>(
  Locator.ResetPasswordController
);

const authRouter = Router();
authRouter.post("/login", main(signIn));
authRouter.post("/request-password-reset", main(requestPasswordReset));
authRouter.post("/reset-password", main(resetPassword));

export { authRouter };
