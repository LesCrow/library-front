import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import banniere from "../../../public/library-banniere.jpg";
import { TUser } from "../../../types/globals";
import useModal from "../modal/useModal";

import Modal from "../modal/Modal";

function Header() {
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
    <div>
      <div className="bg-[#1F293D] ">
        <h1 className="text-center my-5 m-auto py-5 mt-16">
          Welcome to the Wild Library
        </h1>
        <img src={banniere.src} alt="library" className="h-1/6" />
      </div>
      {/* Modal */}
      <>
        <div>
          <button className="text-white" onClick={toggleLoginForm}>
            Sign up
          </button>
          {/* <button onClick={toggleRegistrationForm}>Register</button> */}
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
          {/* <Modal
                isShowing={isRegistrationFormShowed}
                hide={toggleRegistrationForm}
                title="Register"
              >
                <form>
                  <div className="form-group">
                    <input type="text" placeholder="Email Address" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Username" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input type="submit" value="Register" />
                  </div>
                </form>
              </Modal> */}
        </div>
      </>
    </div>
  );
}

export default Header;
