import React from "react";
import ReactDOM from "react-dom";
import { TBook } from "../../types/globals";

interface IProps {
  isShowing: boolean;
  hide: boolean | any;
  title: string;
  children: any;
}

const Modal = ({ isShowing, hide, title, ...props }: IProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay fixed top-0 left-0 w-full h-full z-10 ">
            <div className="modal-wrapper  fixed top-0 left-0 z-20 w-full h-full overflow-x-hidden overflow-y-auto outline-none flex items-center">
              <div className="modal z-0 relative m-auto border rounded-md max-w[500px] w-[80%] p-5">
                <div className="modal-header flex justify-between items-center">
                  <h4>{title}</h4>
                  <button
                    type="button"
                    className="modal-close-button text-2xl cursor-pointer border-none bg-transparent"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body ">{props.children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
