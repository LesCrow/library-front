import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TGenres } from "../../../types/globals";

interface IProps {
  isAddGenreOpen: boolean;
  setIsAddGenreOpen: Function;
}

function FormNewGenre({ isAddGenreOpen, setIsAddGenreOpen }: IProps) {
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

  const closeWindow = () => {
    setIsAddGenreOpen(!isAddGenreOpen);
  };

  return (
    <div className="w-full flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-[#d4bfbf] border-2 border-black min-w-[300px]"
      >
        <div className="flex justify-center relative w-full">
          <h3 className="w-full  text-center py-5 font-montserrat text-2xl  ">
            ADD A GENRE
          </h3>
          <p
            className=" absolute right-3 top-3 cursor-pointer"
            onClick={closeWindow}
          >
            X
          </p>
        </div>
        <label className="my-5 m-auto font-montserrat">Name</label>
        <input
          className="w-[80%] rounded-full m-auto font-montserrat text-center "
          type="text"
          {...register("name", { required: true })}
        />

        <input
          type="submit"
          value="submit"
          className="text-xl text-white border w-[30%] rounded-full bg-blue-500 p-2 m-auto my-10"
        />
      </form>
    </div>
  );
}

export default FormNewGenre;
