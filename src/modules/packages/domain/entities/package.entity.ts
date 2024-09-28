import { Genre } from "../../../genres/domain/entities/genre.entity";

type BasePackage<T> = {
  _id: string;
  name: string;
  genres: T;
  createdAt: Date;
  updatedAt: Date;
  version: number;
};

export type Package = BasePackage<string[]>;
export type PackageWithGenres = BasePackage<Genre[]>;
