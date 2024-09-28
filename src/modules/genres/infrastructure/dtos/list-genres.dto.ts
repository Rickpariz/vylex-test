import { z } from "zod";
import { paginationSchema } from "../../../../shared/infrastructure/dtos/pagination-schema";

export const listGenresSchema = paginationSchema.extend({
  search: z.string().optional(),
});

export type listGenresDto = z.infer<typeof listGenresSchema>;
