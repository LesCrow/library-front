import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function Form({ data }) {
  const { register, handleSubmit } = useForm();
  const urlPost = "http://localhost:5000/api/v1/books";

  const onSubmit = (book: {
    authorId: string;
    title: string;
    collectionId: string;
  }) => {
    console.log(book.authorId);

    axios.post(urlPost, {
      title: book.title,
      authorId: book.authorId,
      collectionId: book.collectionId,
    });
  };

  return (
    <div className="my-10 border">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col item-center bg-blue-200 border border-black rounded-lg"
      >
        <label className="my-5">Title</label>
        <input type="text" {...register("title", { required: true })} />
        <label className="my-5">Author</label>
        <select {...register("authorId", { required: true })}>
          {data.map((item) => (
            <option value={item.author.id}>
              {item.author.firstname} {item.author.lastname}
            </option>
          ))}
        </select>
        <label className=" my-5">Collection</label>
        <select {...register("collectionId", { required: true })}>
          {data.map((item) => (
            <option value={item.collection.id}>{item.collection.name}</option>
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

export default Form;
