import React from "react";
import ReactDOM from "react-dom";

interface IProps {
  isShowing: boolean;
  hide: boolean | any;
  title: string;
  children: any;
}

const Modal = ({
  isShowing,
  hide,
  title,

  ...props
}: IProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          {/* <div className="modal-overlay fixed top-0 left-0 w-full h-full z-50 "> */}
          <div className="fixed top-0 left-0   w-full h-full overflow-x-hidden overflow-y-auto outline-none flex items-center ">
            <div className=" relative m-auto border-4 border-black  rounded-md  w-[400px] h-[400px] bg-[#d57199] p-5">
              <div className="flex justify-between  ">
                <h4 className="m-auto text-2xl">{title}</h4>
                <button
                  type="button"
                  className="modal-close-button text-4xl cursor-pointer  "
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body ">{props.children}</div>
            </div>
          </div>
          {/* </div> */}
        </>,
        document.body
      )
    : null;

export default Modal;
