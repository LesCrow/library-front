import React, { useState } from "react";
import { TCollection } from "../../../types/globals";

interface IProps {
  allCollections: TCollection[];
}

function Collections({ allCollections }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h2 className="text-3xl my-10 w-fit" onClick={() => setIsOpen(!isOpen)}>
        Collections
      </h2>
      <ul>
        {isOpen &&
          allCollections.map((collection) => <li>{collection.name}</li>)}
      </ul>
    </div>
  );
}

export default Collections;
