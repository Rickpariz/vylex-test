import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";
import { PrismaClientLocator } from "../../../shared/domain/enums/di.enums";
import { Locator } from "./di.enums";
import UserRepository from "../../users/infrastructure/database/user.repository";
import { IUseCase } from "../../../shared/domain/usecase";
import { Controller } from "../../../shared/domain/controller";
import { User } from "../../users/domain/entities/user.entity";
import SignInController from "../infrastructure/http/controllers/sign-in.controller";
import RequestPasswordResetController from "../infrastructure/http/controllers/request-password-reset.controller";
import ResetPasswordController from "../infrastructure/http/controllers/reset-password.controller";
import { AccessToken } from "../domain/entities/access-token.entity";
import { SignInDto } from "../infrastructure/dtos/sign-in.dto";
import { RequestPasswordResetDto } from "../infrastructure/dtos/request-password-reset.dto";
import { ResetPasswordDto } from "../infrastructure/dtos/reset-password.dto";
import { IUserRepository } from "../../users/domain/repositories/user-repository.interface";
import SignInUseCase from "../application/use-cases/sign-in.usecase";
import RequestPasswordResetUseCase from "../application/use-cases/request-password-reset.usecase";
import ResetPasswordUsecase from "../application/use-cases/reset-password.usecase";
import { IExternal } from "../../../shared/domain/external";
import { SendResetPasswordEmailExternalParams } from "../infrastructure/externals/types/send-reset-password-email-external.types";
import SendResetPasswordEmailExternal from "../infrastructure/externals/send-reset-password-email.external";

export const container = new Container();

// Prisma Injecton
const prismaClient = new PrismaClient();
container.bind<PrismaClient>(PrismaClientLocator).toConstantValue(prismaClient);

// Controllers Injection
container.bind<Controller>(Locator.SignInController).to(SignInController);
container
  .bind<Controller>(Locator.RequestPasswordResetController)
  .to(RequestPasswordResetController);
container
  .bind<Controller>(Locator.ResetPasswordController)
  .to(ResetPasswordController);

// UseCases Injection
container
  .bind<IUseCase<SignInDto, AccessToken>>(Locator.SignInUseCase)
  .to(SignInUseCase);

container
  .bind<IUseCase<RequestPasswordResetDto, AccessToken>>(
    Locator.RequestPasswordResetUseCase
  )
  .to(RequestPasswordResetUseCase);

container
  .bind<IUseCase<ResetPasswordDto, User>>(Locator.ResetPasswordUseCase)
  .to(ResetPasswordUsecase);

// Repositories Injection
container.bind<IUserRepository>(Locator.UserRepository).to(UserRepository);

// Externals
container
  .bind<IExternal<SendResetPasswordEmailExternalParams, void>>(
    Locator.SendResetPasswordEmailExternal
  )
  .to(SendResetPasswordEmailExternal);
