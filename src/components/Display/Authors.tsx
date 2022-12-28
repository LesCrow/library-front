import React, { useState } from "react";
import { TAuthor } from "../../../types/globals";
import { useQueryClient } from "react-query";
import axios from "axios";

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
      <h2 className="text-3xl my-10 w-1/2" onClick={() => setIsOpen(!isOpen)}>
        Authors
      </h2>
      <ul>
        {isOpen &&
          allAuthors.map((author) => (
            <li>
              {author.firstname} {author.lastname}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Authors;
