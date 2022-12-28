export type TBook = {
  id: string;
  title: string;
  authorId: string;
  collectionId: string;
};

export type TCollection = {
  id: string;
  name: string;
};

export type TAuthor = {
  id: string;
  firstname: string;
  lastname: string | null;
};
