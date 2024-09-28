import { injectable } from "inversify";
import { IExternal } from "../../../../shared/domain/external";
import { BadRequest } from "../../../../shared/infrastructure/http/responses";
import { SendResetPasswordEmailExternalParams } from "./types/send-reset-password-email-external.types";
import { ResendApi } from "../../../../shared/api/resend.api";
import { axiosError } from "../../../../shared/application/errors/axios-error";

@injectable()
export default class SendResetPasswordEmailExternal
  implements IExternal<SendResetPasswordEmailExternalParams, void>
{
  async call(params: SendResetPasswordEmailExternalParams): Promise<void> {
    try {
      await ResendApi.post("/emails", {
        to: params.email,
        subject: "Redefinição de Senha",
        from: "Acme <onboarding@resend.dev>",
        html: `
          <body>
  <div class="container"
    style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px;">
    <h1 style="color: #007BFF; text-align: center;">Redefinição de Senha</h1>
    <p style="line-height: 1.5;">Olá ${params.name},</p>
    <p style="line-height: 1.5;">Você solicitou um link para redefinir sua senha. Para continuar, utilize o token
      abaixo:</p>

    <a href="https://vylex.com.br?token=${params.token}" style="display: inline-block; background-color: #007BFF; color: white; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px; font-size: 16px; margin: 20px 0;">
            Redefinir Senha
        </a>

    <p style="line-height: 1.5;">Se você não solicitou este e-mail, pode ignorá-lo.</p>
    <p style="line-height: 1.5;">Atenciosamente,<br>A equipe do Vylex</p>
  </div>
  <div class="footer" style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
    &copy; 2024 Vylex. Todos os direitos reservados.
  </div>
</body>
        `,
      });
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on send email");
    }
  }
}
