import { z } from "zod";
import { userSchema } from "../../../../shared/infrastructure/dtos/user-schema";

export const listMoviesDtoSchema = z.object({
  pageNumber: z.number().int().positive().default(1),
  genres: z.array(z.number()).optional(),
  user: userSchema,
});

export type ListMoviesDto = z.infer<typeof listMoviesDtoSchema>;
