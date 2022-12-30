import React, { useState } from "react";
import { TAuthor } from "../../../types/globals";
import { useQueryClient } from "react-query";
import axios, { all } from "axios";

interface IProps {
  allAuthors: TAuthor[];
}

function Authors({ allAuthors }: IProps) {
  const client = useQueryClient();
  const deleteOneAuthor = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/authors/${id}`)
      .then(() => client.invalidateQueries(["author"]));
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h2
        className="text-background font-montserrat text-3xl  w-fit cursor-pointer pb-5 hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        AUTHORS
      </h2>
      <ul className="">
        {isOpen &&
          allAuthors.map((author) => (
            <li>
              {author.firstname} {author.lastname}
            </li>
          ))}
        <br />
      </ul>
    </div>
  );
}

export default Authors;
