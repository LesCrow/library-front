import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TAuthor } from "../../../types/globals";

function FormNewAuthor() {
  const { register, handleSubmit } = useForm<TAuthor>();

  const urlPost = "http://localhost:5000/api/v1/authors";

  const client = useQueryClient();

  const onSubmit = (author: TAuthor) => {
    axios
      .post(urlPost, {
        firstname: author.firstname,
        lastname: author.lastname,
      })
      .then(() => client.invalidateQueries("author"));
  };

  return (
    <div className="my-10  flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center bg-yellow border border-grey rounded-lg w-[50%]"
      >
        <label className="my-5 m-auto">First name</label>
        <input
          className="w-[80%] rounded-full m-auto "
          type="text"
          {...register("firstname", { required: true })}
        />
        <label className="my-5 m-auto">Last name</label>
        <input
          className="w-[80%] rounded-full m-auto"
          type="text"
          {...register("lastname", { required: false })}
        />

        <input
          type="submit"
          className="text-white border w-[40%] rounded-full bg-blue-600 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewAuthor;
