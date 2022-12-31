import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TBook, TAuthor, TGenres } from "../../../types/globals";

interface IProps {
  allBooks: TBook[];
  allAuthors: TAuthor[];
  allGenres: TGenres[];
}

function Bibliotheque({ allBooks, allAuthors, allGenres }: IProps) {
  const client = useQueryClient();

  // to display bibliothèque
  const [isOpen, setIsOpen] = useState(false);

  // To display author first and last name
  const authorName = (authorId: string) =>
    allAuthors.map((author) => {
      if (author.id === authorId) {
        return <p>{author.name}</p>;
      }
    });

  // To display genre name
  const genreName = (genreId: string) =>
    allGenres.map((genre) => {
      if (genre.id === genreId) {
        return <p>{genre.name}</p>;
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

  const onSubmit = async (book: TBook) => {
    console.log("ok");
    await axios
      .put(`http://localhost:5000/api/v1/books/${oldBookData.id}`, {
        title: book.title,
        authorId: book.authorId,
        genreId: book.genreId,
      })
      .then(() => client.invalidateQueries("book"));
  };

  return (
    <div className="w-full flex flex-col items-center py-10">
      {/* Bibliothèque table */}
      <h2
        className="text-background text-3xl w-fit cursor-pointer font-montserrat hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        BIBLIOTHEQUE
      </h2>
      {isOpen && (
        <table className="border-2 bg-[#d4bfbf] border-background w-5/6   my-5">
          <tr className="border  border-black">
            <th className="text-background font-montserrat">TITLE</th>
            <th className="text-background font-montserrat">AUTHOR</th>
            <th className="text-background font-montserrat">GENRE</th>
          </tr>
          {allBooks.map((book) => (
            <tr className="text-center font-montserrat" key={book.id}>
              <td>{book.title}</td>
              <td>{authorName(book.authorId)}</td>
              <td>{genreName(book.genreId)}</td>

              <td
                onClick={() => setIsUpdateABookOpen(!isupdateABookOpen)}
                className="cursor-pointer hover:text-green-800 hover:font-bold "
              >
                <span onClick={() => setOldBookData(book)}>Modify</span>
              </td>
              <td
                onClick={() => deleteOneBook(book.id)}
                className=" text-red-600 cursor-pointer hover:font-bold "
              >
                X
              </td>
            </tr>
          ))}
        </table>
      )}

      {/* update form */}
      <div className="flex w-full justify-center mt-16 font-montserrat">
        {isupdateABookOpen && (
          <form
            className="flex flex-col p-5 border-2 border-black bg-[#d4bfbf]"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                    <option value={author.id}>{author.name}</option>
                  )
              )}
            </select>
            <label>genre</label>
            <select {...register("genreId", { required: true })}>
              <option value={oldBookData.genreId}>
                {genreName(oldBookData.genreId)}
              </option>
              {allGenres.map(
                (genre) =>
                  oldBookData.genreId !== genre.id && (
                    <option value={genre.id}>{genre.name}</option>
                  )
              )}
            </select>
            <input
              type="submit"
              value="Submit"
              className=" cursor-pointer text-xl text-white border w-[30%] rounded-full bg-blue-500 p-2 m-auto my-10"
            />
          </form>
        )}
      </div>
    </div>
  );
}

export default Bibliotheque;
