import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";

import { TBook, TAuthor, TCollection } from "../../../types/globals";
interface IProps {
  allBooks: TBook[];
  allAuthors: TAuthor[];
  allCollections: TCollection[];
}

function Bibliotheque({ allBooks, allAuthors, allCollections }: IProps) {
  const client = useQueryClient();
  const deleteOneBook = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/books/${id}`)
      .then(() => client.invalidateQueries(["book"]));
  };

  const authorName = (authorId: string) =>
    allAuthors.map((author) => {
      if (author.id === authorId) {
        return (
          <p>
            {author.firstname} {author.lastname}
          </p>
        );
      }
    });

  const collectionName = (collectionId: string) =>
    allCollections.map((collection) => {
      if (collection.id === collectionId) {
        return <p>{collection.name}</p>;
      }
    });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2 className="text-3xl my-10 w-fit " onClick={() => setIsOpen(!isOpen)}>
        Bibliothèque
      </h2>
      {isOpen && (
        <table className="border w-full my-5">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Collection</th>
          </tr>
          {allBooks.map((book, key) => (
            <tr className="text-center">
              <td>{book.title}</td>
              <td>{authorName(book.authorId)}</td>
              <td>{collectionName(book.collectionId)}</td>

              <button
                onClick={() => deleteOneBook(book.id)}
                className=" text-red-600"
              >
                X
              </button>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default Bibliotheque;
