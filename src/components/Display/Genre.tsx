import axios from "axios";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { TGenres } from "../../../types/globals";

interface IProps {
  allGenres: TGenres[];
}

function Genre({ allGenres }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const client = useQueryClient();
  const deleteOneGenre = async (id: string) => {
    const response = await axios
      .delete(`http://localhost:5000/api/v1/genres/${id}`)
      .then(() => client.invalidateQueries(["genre"]));
  };
  return (
    <div>
      <h2
        className="text-background font-montserrat text-3xl w-fit cursor-pointer hover:underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        GENRES
      </h2>
      <ul className="pt-5">
        {isOpen || allGenres.length > 0 ? (
          allGenres.map((genre) => (
            <li className="font-montserrat w-full flex justify-between">
              {genre.name}{" "}
              <button
                className="text-red-600"
                onClick={() => deleteOneGenre(genre.id)}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <p className="font-montserrat text-center">No Genres</p>
        )}
      </ul>
      <br />
    </div>
  );
}

export default Genre;
