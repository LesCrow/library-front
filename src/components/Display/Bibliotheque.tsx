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

  const closeBibliotheque = () => {
    setIsOpen(!isOpen);
  };

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
            <th className="text-background font-montserrat">ALREADY READ</th>

            <th></th>
            <th
              onClick={closeBibliotheque}
              className="font-montserrat text-2xl cursor-pointer"
            >
              x
            </th>
          </tr>
          {allBooks.map((book) => (
            <tr className="text-center font-montserrat" key={book.id}>
              <td>{book.title}</td>
              <td>{authorName(book.authorId)}</td>
              <td>{genreName(book.genreId)}</td>
              {book.alreadyRead ? <td>True</td> : <td>False</td>}

              <td
                onClick={() => setIsUpdateABookOpen(!isupdateABookOpen)}
                className="cursor-pointer hover:text-green-800 hover:font-bold "
              >
                <span onClick={() => setOldBookData(book)}>Update</span>
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
      <div className="w-full flex justify-center">
        {isupdateABookOpen && (
          <form
            className="flex flex-col bg-[#d4bfbf] border-2 border-black"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="w-full  text-center py-5 font-montserrat text-2xl  ">
              UPDATE A BOOK
            </h3>
            <label className="my-5 m-auto font-montserrat">Title</label>
            <input
              className=" w-[80%] rounded-full m-auto font-montserrat text-center"
              type="text"
              placeholder={oldBookData.title}
              {...register("title", { required: true })}
            />
            <label className="my-5 m-auto  font-montserrat">Author</label>
            <select
              className="w-[80%] h-6 m-auto rounded-full bg-white font-montserrat text-center"
              {...register("authorId", { required: true })}
            >
              <option className="font-montserrat" value={oldBookData.authorId}>
                {authorName(oldBookData.authorId)}
              </option>
              {allAuthors.map(
                (author) =>
                  oldBookData.authorId !== author.id && (
                    <option value={author.id}>{author.name}</option>
                  )
              )}
            </select>
            <label className="my-5 m-auto font-montserrat">Genre</label>
            <select
              className="w-[80%] h-6 m-auto rounded-full bg-white font-montserrat text-center"
              {...register("genreId", { required: true })}
            >
              <option className="font-montserrat" value={oldBookData.genreId}>
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
