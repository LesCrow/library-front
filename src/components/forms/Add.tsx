import React, { useEffect, useState } from "react";
import { TAuthor, TGenres } from "../../../types/globals";
import FormNewAuthor from "./FormNewAuthor";
import FormNewBook from "./FormNewBook";
import FormNewGenre from "./FormNewGenre";

interface IProps {
  allAuthors: TAuthor[];
  allGenres: TGenres;
}

function Add({ allAuthors, allGenres }: IProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);

  useEffect(() => {
    isAddBookOpen && setIsAddAuthorOpen(false);
    setIsAddCollectionOpen(false);
  }, [isAddBookOpen]);

  useEffect(() => {
    isAddAuthorOpen && setIsAddBookOpen(false);
    setIsAddCollectionOpen(false);
  }, [isAddAuthorOpen]);

  useEffect(() => {
    isAddCollectionOpen && setIsAddBookOpen(false);
    setIsAddAuthorOpen(false);
  }, [isAddCollectionOpen]);

  useEffect(() => {
    !isAddOpen && setIsAddBookOpen(false);
    setIsAddAuthorOpen(false);
    setIsAddBookOpen(false);
    setIsAddCollectionOpen(false);
  }, [isAddOpen]);
  return (
    <div className=" w-full  flex flex-col items-center">
      {" "}
      <h2
        className="text-background font-montserrat w-fit hover:underline cursor-pointer "
        onClick={() => setIsAddOpen(!isAddOpen)}
      >
        ADD +
      </h2>
      {isAddOpen && (
        <div className=" w-full flex justify-around my-5">
          <p
            className="text-background font-montserrat cursor-pointer hover:underline"
            onClick={() => setIsAddBookOpen(!isAddBookOpen)}
          >
            A BOOK
          </p>
          <p
            className="text-background font-montserrat cursor-pointer hover:underline ml-16"
            onClick={() => setIsAddAuthorOpen(!isAddAuthorOpen)}
          >
            AN AUTHOR
          </p>
          <p
            className="text-background font-montserrat cursor-pointer hover:underline"
            onClick={() => setIsAddCollectionOpen(!isAddCollectionOpen)}
          >
            A COLLECTION
          </p>
        </div>
      )}
      {isAddBookOpen && (
        <FormNewBook allAuthors={allAuthors} allGenres={allGenres} />
      )}
      {isAddAuthorOpen && <FormNewAuthor />}
      {isAddCollectionOpen && <FormNewGenre />}
    </div>
  );
}

export default Add;
