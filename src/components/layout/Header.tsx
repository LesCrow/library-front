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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  // Burger Menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Modal form
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();

  const {
    isShowing: isRegistrationFormShowed,
    toggle: toggleRegistrationForm,
  } = useModal();

  const { register, handleSubmit, reset, formState, getValues } =
    useForm<TUser>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      toggleLoginForm();
    }
  }, [formState, reset]);

  const urlPostUser = "http://localhost:5000/api/v1/auth/signup";

  const client = useQueryClient();

  // Toastify
  const notify = (message: string) =>
    toast.success(message, {
      position: "top-center",
      theme: "dark",
    });

  const onSubmit = (user: TUser) => {
    axios
      .post(urlPostUser, {
        email: user.email,
        password: user.password,
      })
      .then(() => client.invalidateQueries);
    notify(`Welcome ${getValues("email")} !`);
  };

  return (
    <div className="bg-[#1F293D] flex flex-col ">
      <div className=" flex justify-between pt-10 px-20 ">
        {/* Menu burger */}
        <img src={iconLivres.src} className="w-16" />

        <div className="flex">
          <button
            className="whitespace-nowrap text-white border h-10  rounded-md w-28 "
            onClick={toggleRegistrationForm}
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

      <h1 className="text-center mb-10 m-auto py-10 ">
        Welcome to the Wild Library
      </h1>

      <img src={banniere.src} alt="library" className="h-1/6" />
      <ToastContainer />

      {/* Modal */}
      {/* <>
        <div>
          <Modal
            isShowing={isLoginFormShowed}
            hide={toggleLoginForm}
            title="SIGN IN"
          >
            <form
              // onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col    h-80 w-80 justify-around m-auto items-center"
            >
              <div className="flex flex-col mt-5">
                <input
                  className="my-2 rounded-full border border-[#1F293D] h-10 text-center"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                <input
                  className="rounded-full border border-[#1F293D] h-10 text-center mt-2"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className=" ">
                <input
                  className="text-white font-bold rounded-full border w-24 h-12 bg-[#369433] "
                  type="submit"
                  value="Sign In"
                  onClick={() => notify()}
                />
              </div>
              <ToastContainer />
            </form>
          </Modal>
        </div>
      </> */}

      <>
        <div>
          <Modal
            isShowing={isRegistrationFormShowed}
            hide={toggleRegistrationForm}
            title="Sign up"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-60 w-60 justify-around m-auto items-center"
            >
              <div className="flex flex-col mt-5">
                <input
                  className="my-2 rounded-full border border-[#1F293D] h-10 text-center"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />

                <input
                  className="rounded-full border border-[#1F293D] h-10 text-center mt-2"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              <div className=" ">
                <input
                  className="text-white font-bold rounded-full border w-24 h-12 bg-[#369433] "
                  type="submit"
                  value="Sign Up"
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
