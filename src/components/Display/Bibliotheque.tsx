import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
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
  const { register, handleSubmit } = useForm<TBook>();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmit = async (id: string, book: TBook) => {
    await axios
      .put(`http://localhost:5000/api/v1/books/${id}`, {
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
              <td className="cursor-pointer" onClick={() => setData(book)}>
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
      <form className="flex flex-col">
        <label>title</label>
        <input
          type="text"
          placeholder={data.title}
          {...register("title", { required: true })}
        />
        <label>author</label>
        <select {...register("authorId", { required: true })}>
          <option value={data.authorId}>{authorName(data.authorId)}</option>
          {allAuthors.map(
            (author) =>
              data.authorId !== author.id && (
                <option value={author.id}>
                  {author.firstname} {author.lastname}
                </option>
              )
          )}
        </select>
        <label>collection</label>
        <select {...register("collectionId", { required: true })}>
          <option value={data.collectionId}>
            {collectionName(data.collectionId)}
          </option>
          {allCollections.map(
            (collection) =>
              data.collectionId !== collection.id && (
                <option value={collection.id}>{collection.name}</option>
              )
          )}
        </select>
      </form>
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
