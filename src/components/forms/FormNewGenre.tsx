import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TAuthor, TBook, TGenres } from "../../types/globals";

function FormNewGenre() {
  const { register, handleSubmit } = useForm<TGenres>();

  const urlPost = "http://localhost:5000/api/v1/genres";

  const client = useQueryClient();

  const onSubmit = (genre: TGenres) => {
    axios
      .post(urlPost, {
        name: genre.name,
      })
      .then(() => client.invalidateQueries("genres"));
  };

  return (
    <div className="my-10  flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center   rounded-lg w-[80%]"
      >
        <label className="my-5 m-auto">Name</label>
        <input
          className="w-[80%] rounded-full m-auto"
          type="text"
          {...register("name", { required: true })}
        />

        <input
          type="submit"
          className="text-white border w-[40%] rounded-full bg-blue-600 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewGenre;
