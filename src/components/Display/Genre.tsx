import React, { useState } from "react";
import { TGenres } from "../../../types/globals";

interface IProps {
  allGenres: TGenres[];
}

function Genre({ allGenres }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <h2
        className="text-background font-montserrat text-3xl w-fit cursor-pointer hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        GENRE
      </h2>
      <ul className="pt-5">
        {isOpen && allGenres.map((genre) => <li>{genre.name}</li>)}
      </ul>
      <br />
    </div>
  );
}

export default Genre;
