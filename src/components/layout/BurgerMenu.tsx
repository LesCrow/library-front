import React from "react";
import { slide as Menu } from "react-burger-menu";
import iconLivres from "../../../public/icone-livres.png";
type Props = {};

export default function BurgerMenu({}: Props) {
  return (
    <div>
      <Menu
        width={"20%"}
        customBurgerIcon={
          <img src={iconLivres.src} alt="icone-livres" className=" " />
        }
        burgerButtonClassName={"burger-button"}
      >
        <p>home</p>
      </Menu>
    </div>
  );
}
