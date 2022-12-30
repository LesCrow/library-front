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
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-[#d4bfbf] border-2 border-black"
      >
        <h3 className="w-full  text-center py-5 font-montserrat text-2xl  ">
          ADD AN AUTHOR
        </h3>
        <label className="my-5 m-auto font-montserrat">First name</label>
        <input
          className="w-[80%] rounded-full m-auto font-montserrat text-center "
          type="text"
          {...register("firstname", { required: true })}
        />
        <label className="my-5 m-auto  font-montserrat">Last name</label>
        <input
          className="w-[80%] rounded-full m-auto font-montserrat text-center"
          type="text"
          {...register("lastname", { required: false })}
        />

        <input
          type="submit"
          value="Submit"
          className="text-xl text-white border w-[30%] rounded-full bg-blue-500 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewAuthor;
