import React from "react";
import banniere from "../../public/library-banniere.jpg";

function Header() {
  return (
    <div>
      <img src={banniere.src} alt="library" className="h-1/6" />
      <h1 className=" text-center my-5 border rounded-lg w-[90%] m-auto py-5 mt-16">
        Welcome to the Wild Library
      </h1>
    </div>
  );
}

export default Header;
