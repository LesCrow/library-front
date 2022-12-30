import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import banniere from "../../../public/library-banniere.jpg";
import { TUser } from "../../../types/globals";
import useModal from "../modal/useModal";
import iconLivres from "../../../public/icone-livres.png";
import { slide as Menu } from "react-burger-menu";
import Modal from "../modal/Modal";
import BurgerMenu from "./BurgerMenu";

function Header() {
  // Burger Menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Modal - Form
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();

  const { register, handleSubmit, reset, formState } = useForm<TUser>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      toggleLoginForm();
    }
  }, [formState, reset]);

  const urlPostUser = "http://localhost:5000/api/v1/auth/signup";

  const client = useQueryClient();

  const onSubmit = (user: TUser) => {
    axios
      .post(urlPostUser, {
        email: user.email,
        password: user.password,
      })
      .then(() => client.invalidateQueries);
  };

  return (
    <div className="bg-[#1F293D] flex flex-col ">
      <div className=" flex justify-between pt-10 px-20 ">
        {/* Menu burger */}
        <img src={iconLivres.src} className="w-16" />

        <div className="flex">
          <button
            className="whitespace-nowrap text-white border h-10  rounded-md w-28 "
            onClick={toggleLoginForm}
          >
            Sign up
          </button>
          <button
            className="hidden md:block text-white h-10 w-28 border rounded-md mx-5 "
            onClick={toggleLoginForm}
          >
            Sign in
          </button>
        </div>
      </div>

      <h1 className="text-center my-5 m-auto py-5 ">
        Welcome to the Wild Library
      </h1>
      {/* <button onClick={toggleRegistrationForm}>Register</button> */}

      <img src={banniere.src} alt="library" className="h-1/6" />

      {/* Modal */}
      <>
        <div>
          <Modal
            isShowing={isLoginFormShowed}
            hide={toggleLoginForm}
            title="Sign up"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group ">
                <input
                  className="my-2 rounded-full"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                <input
                  className="rounded-full"
                  type="text"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="form-group flex justify-center my-">
                <input
                  className="rounded-full border w-16"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </Modal>
        </div>
      </>
    </div>
  );
}

export default Header;
