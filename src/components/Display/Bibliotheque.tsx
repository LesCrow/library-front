import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const updateOneBook = async (id: string) => {
    const body = {
      title: "bete de test",
      authorId: "f143be03-4d13-4528-9fa8-94dd628ae01e",
      collectionId: "33482ac6-73a3-428f-b81a-0dd6c8ff84b4",
    };
    const response = await axios
      .put(`http://localhost:5000/api/v1/books/${id}`, body)
      .then(() => client.invalidateQueries(["book"]));
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
              <td
                onClick={() =>
                  updateOneBook("cd9000c2-16c0-4108-8d2f-2f667414cedd")
                }
              >
                M
              </td>
            </tr>
          ))}
        </table>
      )}
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
