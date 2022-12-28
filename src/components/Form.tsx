import React from "react";
import { TAuthor, TBook, TCollection } from "../../types/globals";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

interface IProps {
  allAuthors: TAuthor[];
  allCollections: TCollection[];
  isBook: boolean;
  isAuthor: boolean;
  isCollection: boolean;
}

function Form({
  allAuthors,
  allCollections,
  isBook,
  isAuthor,
  isCollection,
}: IProps) {
  const { register, handleSubmit } = useForm<TBook | TAuthor | TCollection>();

  return (
    <div>
      <form>
        {isBook && <label>Title</label>}
        {isAuthor && <label>First name</label>}
        {isCollection && <label>Name</label>}
      </form>
    </div>
  );
}

export default Form;
