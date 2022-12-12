import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Display({ data, loading }) {
  return (
    <div className="my-10 flex justify-around">
      <div>
        <h2 className="text-2xl ">MY BOOKS</h2>

        {loading && <div>Loading</div>}
        {!loading && (
          <ul>
            {data.map((item) => (
              <li>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-2xl">AUTHORS</h2>

        {loading && <div>Loading</div>}
        {!loading && (
          <ul>
            {data.map((item) => (
              <li>
                {item.author.firstname} {item.author.lastname}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h2 className="text-2xl">COLLECTION</h2>
        {loading && <div>Loading</div>}
        {!loading && (
          <ul>
            {data.map((item) => (
              <li>{item.collection.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Display;
