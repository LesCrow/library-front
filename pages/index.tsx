import axios from "axios";
import Head from "next/head";
import Header from "../src/components/Header";
import Bibliotheque from "../src/components/Display/Bibliotheque";
import Authors from "../src/components/Display/Authors";
import { useQuery } from "react-query";
import Collections from "../src/components/Display/Collections";
import { useState, useEffect } from "react";
import FormNewBook from "../src/components/FormNewBook";
import FormNewAuthor from "../src/components/FormNewAuthor";
import FormNewCollection from "../src/components/FormNewCollection";
import useModal from "../src/components/useModal";
import Modal from "../src/components/Modal";

const getAllBooks = async () => {
  const allBooks = await axios.get("http://localhost:5000/api/v1/books");
  return allBooks.data;
};

const getAllAuthors = async () => {
  const allAuthors = await axios.get("http://localhost:5000/api/v1/authors");
  return allAuthors.data;
};

const getAllCollections = async () => {
  const allCollections = await axios.get(
    "http://localhost:5000/api/v1/collections"
  );
  return allCollections.data;
};

export default function Home() {
  // Modal
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();

  // Bibliothèque, authors, collection and add form displayer
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

  // UseQuery
  const { isLoading, data: allBooks, error } = useQuery("books", getAllBooks);
  const { data: allAuthors } = useQuery("authors", getAllAuthors);
  const { data: allCollections } = useQuery("collections", getAllCollections);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something bad happen</p>;
  }

  return (
    // <>
    //   <div>
    //     <button onClick={toggleLoginForm}>Login</button>
    //     <button onClick={toggleRegistrationForm}>Register</button>
    //     <Modal
    //       isShowing={isLoginFormShowed}
    //       hide={toggleLoginForm}
    //       title="login"
    //     >
    //       <form>
    //         <div className="form-group">
    //           <input type="text" placeholder="Username" />
    //         </div>
    //         <div className="form-group">
    //           <input type="text" placeholder="Password" />
    //         </div>
    //         <div className="form-group">
    //           <input type="submit" value="Login" />
    //         </div>
    //       </form>
    //     </Modal>
    //     <Modal
    //       isShowing={isRegistrationFormShowed}
    //       hide={toggleRegistrationForm}
    //       title="Register"
    //     >
    //       <form>
    //         <div className="form-group">
    //           <input type="text" placeholder="Email Address" />
    //         </div>
    //         <div className="form-group">
    //           <input type="text" placeholder="Username" />
    //         </div>
    //         <div className="form-group">
    //           <input type="text" placeholder="Password" />
    //         </div>
    //         <div className="form-group">
    //           <input type="submit" value="Register" />
    //         </div>
    //       </form>
    //     </Modal>
    //   </div>
    // </>
    /////////////////////////////////
    <div>
      <Head>
        <title>Wild Library</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-background h-screen">
        <Header />
        <Bibliotheque
          allBooks={allBooks}
          allAuthors={allAuthors}
          allCollections={allCollections}
        />
        <Authors allAuthors={allAuthors} />
        <Collections allCollections={allCollections} />
        <h2 className="w-fit" onClick={() => setIsAddOpen(!isAddOpen)}>
          ADD
        </h2>
        {isAddOpen && (
          <div className="flex w-full justify-around my-5">
            <p onClick={() => setIsAddBookOpen(!isAddBookOpen)}>a book</p>
            <p onClick={() => setIsAddAuthorOpen(!isAddAuthorOpen)}>
              an author
            </p>
            <p onClick={() => setIsAddCollectionOpen(!isAddCollectionOpen)}>
              a collection
            </p>
          </div>
        )}
        {isAddBookOpen && (
          <FormNewBook
            allAuthors={allAuthors}
            allCollections={allCollections}
          />
        )}
        {isAddAuthorOpen && <FormNewAuthor />}
        {isAddCollectionOpen && <FormNewCollection />}
      </main>
    </div>
  );
}
