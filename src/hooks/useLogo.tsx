import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const usePortal = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) {
      timer = setTimeout(() => setShow(false), 3400);
    }
    return () => clearTimeout(timer);
  }, [show]);

  const showPortal = () => setShow(true);

  const portal = show
    ? ReactDOM.createPortal(
        <div className="flex-center absolute bottom-0 left-0 right-0 top-0 h-screen w-screen bg-[#262626] font-['Lexend']">
          <h1 className="text-8xl font-black uppercase tracking-widest">
            <span className="text-loading" data-text-preloader="H">
              H
            </span>
            <span className="text-loading" data-text-preloader="O">
              O
            </span>
            <span className="text-loading" data-text-preloader="O">
              O
            </span>
            <span className="text-loading" data-text-preloader="K">
              K
            </span>
            <span className="text-loading ml-5" data-text-preloader="L">
              L
            </span>
            <span className="text-loading" data-text-preloader="O">
              O
            </span>
            <span className="text-loading" data-text-preloader="O">
              O
            </span>
            <span className="text-loading" data-text-preloader="P">
              P
            </span>
          </h1>
        </div>,
        document.getElementById("portal") as Element,
      )
    : null;

  // return [showPortal, portal];
  return { showPortal, portal };
};

export default usePortal;
