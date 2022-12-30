import React, { useState } from "react";
import { TGenres } from "../../../types/globals";

interface IProps {
  allGenres: TGenres[];
}

function Genre({ allGenres }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h2 className="text-3xl my-10 w-fit" onClick={() => setIsOpen(!isOpen)}>
        Genre
      </h2>
      <ul className="mb-10">
        {isOpen && allGenres.map((genre) => <li>{genre.name}</li>)}
      </ul>
    </div>
  );
}

export default Genre;
