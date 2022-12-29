import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TBook, TAuthor, TCollection } from "../../../types/globals";

interface IProps {
  allBooks: TBook[];
  allAuthors: TAuthor[];
  allCollections: TCollection[];
}

function Bibliotheque({ allBooks, allAuthors, allCollections }: IProps) {
  const client = useQueryClient();

  // to display bibliothèque
  const [isOpen, setIsOpen] = useState(false);

  // To display author first and last name
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

  // To display collection name
  const collectionName = (collectionId: string) =>
    allCollections.map((collection) => {
      if (collection.id === collectionId) {
        return <p>{collection.name}</p>;
      }
    });

  // To delete a book
  const deleteOneBook = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/books/${id}`)
      .then(() => client.invalidateQueries(["book"]));
  };

  //to open update a book form & to submit updated book

  const { register, handleSubmit } = useForm<TBook>();
  const [oldBookData, setOldBookData] = useState<any>([]);
  const [isupdateABookOpen, setIsUpdateABookOpen] = useState<boolean>(false);

  const updateABookDisplayer = () => {};

  const onSubmit = async (book: TBook) => {
    console.log("ok");
    await axios
      .put(`http://localhost:5000/api/v1/books/${oldBookData.id}`, {
        title: book.title,
        authorId: book.authorId,
        collectionId: book.collectionId,
      })
      .then(() => client.invalidateQueries("book"));
  };

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
          {allBooks.map((book) => (
            <tr className="text-center" key={book.id}>
              <td
                className="cursor-pointer"
                onClick={() => setOldBookData(book)}
              >
                {book.title}
              </td>
              <td>{authorName(book.authorId)}</td>
              <td>{collectionName(book.collectionId)}</td>
              <td
                onClick={() => deleteOneBook(book.id)}
                className=" text-red-600 cursor-pointer"
              >
                X
              </td>
              <td onClick={() => setIsUpdateABookOpen(!isupdateABookOpen)}>
                Modify
              </td>
            </tr>
          ))}
        </table>
      )}

      {/* update form */}
      <div className="flex w-full justify-center">
        {isupdateABookOpen && (
          <form className="flex flex-col p-5" onSubmit={handleSubmit(onSubmit)}>
            <label>title</label>
            <input
              type="text"
              placeholder={oldBookData.title}
              {...register("title", { required: true })}
            />
            <label>author</label>
            <select {...register("authorId", { required: true })}>
              <option value={oldBookData.authorId}>
                {authorName(oldBookData.authorId)}
              </option>
              {allAuthors.map(
                (author) =>
                  oldBookData.authorId !== author.id && (
                    <option value={author.id}>
                      {author.firstname} {author.lastname}
                    </option>
                  )
              )}
            </select>
            <label>collection</label>
            <select {...register("collectionId", { required: true })}>
              <option value={oldBookData.collectionId}>
                {collectionName(oldBookData.collectionId)}
              </option>
              {allCollections.map(
                (collection) =>
                  oldBookData.collectionId !== collection.id && (
                    <option value={collection.id}>{collection.name}</option>
                  )
              )}
            </select>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Bibliotheque;
