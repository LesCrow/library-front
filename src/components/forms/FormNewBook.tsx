import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TAuthor, TBook, TGenres } from "../../../types/globals";

interface IProps {
  allAuthors: TAuthor[];
  allGenres: TGenres[];
  isAddBookOpen: boolean;
  setIsAddBookOpen: Function;
}

function FormNewBook({
  allAuthors,
  allGenres,
  isAddBookOpen,
  setIsAddBookOpen,
}: IProps) {
  const { register, handleSubmit } = useForm<TBook>();
  const client = useQueryClient();

  const urlPost = "http://localhost:5000/api/v1/books";

  const onSubmit = async (book: TBook) => {
    await axios
      .post(urlPost, {
        title: book.title,
        authorId: book.authorId,
        genreId: book.genreId,
        alreadyRead: book.alreadyRead,
      })
      .then(() => client.invalidateQueries("book"));
  };

  const closeWindow = () => {
    setIsAddBookOpen(!isAddBookOpen);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-[#d4bfbf] border-2 border-black min-w-[300px]"
      >
        <div className="flex w-full justify-center relative">
          <h3 className="  py-5 font-montserrat text-2xl  ">ADD A BOOK</h3>
          <p
            className=" absolute right-3 top-3 cursor-pointer"
            onClick={closeWindow}
          >
            X
          </p>
        </div>
        <label className="my-5 m-auto font-montserrat">Title</label>
        <input
          className=" w-[80%] rounded-full m-auto font-montserrat text-center"
          type="text"
          {...register("title", { required: true })}
        />
        <label className="my-5 m-auto  font-montserrat">Author</label>
        <select
          className="w-[80%] h-6 m-auto rounded-full bg-white font-montserrat text-center"
          {...register("authorId", { required: true })}
        >
          {allAuthors.map((item) => (
            <option value={item.id} className="font-montserrat">
              {item.name}
            </option>
          ))}
        </select>
        <label className="my-5 m-auto font-montserrat">Genre</label>
        <select
          className="w-[80%] h-6 m-auto rounded-full bg-white font-montserrat text-center"
          {...register("genreId", { required: true })}
        >
          {allGenres.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <div className="flex flex-col items-center mt-8">
          <p className="font-montserrat">Is already Read ?</p>
          <div className="mt-4 flex w-1/2  justify-around">
            <div>
              <input type="radio" name="isAlreadyRead" value="False" />
              <label className="font-montserrat">False</label>
            </div>
            <div>
              <input type="radio" name="isAlreadyRead" value="True" />
              <label className="font-montserrat">True</label>
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Submit"
          className=" cursor-pointer text-xl text-white border w-[30%] rounded-full bg-blue-500 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewBook;
