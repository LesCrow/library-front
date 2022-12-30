export type TBook = {
  id: string;
  title: string;
  authorId: string;
  genreId: string;
};

export type TGenres = {
  id: string;
  name: string;
};

export type TAuthor = {
  id: string;
  firstname: string;
  lastname: string | null;
};

export type TUser = {
  id: string;
  email: string;
  password: string;
};
