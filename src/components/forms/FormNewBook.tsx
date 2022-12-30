import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TAuthor, TBook, TGenres } from "../../../types/globals";

interface IProps {
  allAuthors: TAuthor[];
  allGenres: TGenres[];
}

function FormNewBook({ allAuthors, allGenres }: IProps) {
  const { register, handleSubmit } = useForm<TBook>();
  const client = useQueryClient();

  const urlPost = "http://localhost:5000/api/v1/books";

  const onSubmit = async (book: TBook) => {
    await axios
      .post(urlPost, {
        title: book.title,
        authorId: book.authorId,
        genreId: book.genreId,
      })
      .then(() => client.invalidateQueries("book"));
  };

  return (
    <div className="my-10  flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center "
      >
        <label className="my-5 m-auto">Title</label>
        <input
          className="w-[80%] rounded-full m-auto"
          type="text"
          {...register("title", { required: true })}
        />
        <label className="my-5 m-auto">Author</label>
        <select
          className="w-[80%] h-6 m-auto rounded-full bg-white"
          {...register("authorId", { required: true })}
        >
          {allAuthors.map((item) => (
            <option value={item.id}>
              {item.firstname} {item.lastname}
            </option>
          ))}
        </select>
        <label className=" my-5 m-auto">Genre</label>
        <select
          className="w-[80%] h-6 m-auto rounded-full bg-white"
          {...register("genreId", { required: true })}
        >
          {allGenres.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
        <input
          type="submit"
          className="text-white border w-[40%] rounded-full bg-blue-600 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewBook;
