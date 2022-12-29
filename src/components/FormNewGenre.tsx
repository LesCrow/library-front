import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TAuthor, TBook, TCollection } from "../../types/globals";

function FormNewGenre() {
  const { register, handleSubmit } = useForm<TCollection>();

  const urlPost = "http://localhost:5000/api/v1/collections";

  const client = useQueryClient();

  const onSubmit = (collection: TCollection) => {
    axios
      .post(urlPost, {
        name: collection.name,
      })
      .then(() => client.invalidateQueries("collection"));
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
