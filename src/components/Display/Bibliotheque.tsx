import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { json } from "stream/consumers";
import { TBook, TAuthor, TCollection } from "../../../types/globals";
import Modal from "../Modal";
import useModal from "../useModal";

interface IProps {
  allBooks: TBook[];
  allAuthors: TAuthor[];
  allCollections: TCollection[];
}

function Bibliotheque({ allBooks, allAuthors, allCollections }: IProps) {
  const client = useQueryClient();

  // Modal
  const { isShowing, toggle } = useModal();

  // to display bibliothèque
  const [isOpen, setIsOpen] = useState(false);

  // To delete a book
  const deleteOneBook = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/books/${id}`)
      .then(() => client.invalidateQueries(["book"]));
  };

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

  // to submit updated book

  const [oldBookData, setOldBookData] = useState<any>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthorId, setNewAuthorId] = useState<string>("");
  const [newCollectionId, setNewCollectionId] = useState<string>("");

  useEffect(() => {}, [oldBookData]);
  const { register, handleSubmit } = useForm<TBook>();

  const onSubmit = async (
    // id: string,
    // title: string,
    // authorId: string,
    // collectionId: string
    book: TBook
  ) => {
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
            </tr>
          ))}
        </table>
      )}
      {/* update form */}
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label>title</label>
        <input
          type="text"
          placeholder={oldBookData.title}
          {...register("title", { required: true })}
          // onChange={(e) => setNewTitle(e.target.value)}
        />
        <label>author</label>
        <select
          {...register("authorId", { required: true })}
          // onChange={(e) => setNewAuthorId(e.target.value)}
        >
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
        <select
          {...register("collectionId", { required: true })}
          // onChange={(e) => setNewCollectionId(e.target.value)}
        >
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
      {/* modal */}
      <Modal isShowing={isShowing} hide={toggle} title="Update">
        <form>
          <div className="form-group">
            <input type="text" placeholder="Title" />
          </div>
          <div className="form-group">
            <select>
              {allAuthors.map((author) => (
                <option value={author.id}>
                  {author.firstname} {author.lastname}
                </option>
              ))}
            </select>
          </div>{" "}
          <div className="form-group">
            <select>
              {allCollections.map((collection) => (
                <option>{collection.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Bibliotheque;
