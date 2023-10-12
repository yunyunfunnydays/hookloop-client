import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const usePortal = () => {
  const [showPortal, setShowPortal] = useState<boolean>(false);

  const portal = showPortal
    ? ReactDOM.createPortal(
        <div className="flex-center absolute bottom-0 left-0 right-0 top-0 z-50 h-screen w-screen bg-[#262626] font-['Lexend']">
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
  return { setShowPortal, portal };
};

export default usePortal;
