import { AxiosError } from "axios";
import logger from "../../infrastructure/logger";
import { BadRequest } from "../../infrastructure/http/responses";

export function axiosError(error: unknown) {
  if (error instanceof AxiosError) {
    logger.error("Axios error: ", error.response?.data);
    throw BadRequest(JSON.stringify(error.response?.data));
  }
}
