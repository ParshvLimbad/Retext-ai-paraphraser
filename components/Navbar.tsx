import React from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="flex w-full justify-center">
      <nav className="flex flex-row pl-8 pr-8 mt-6 bg-accent rounded-full w-[96%] items-center h-[4rem] justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          ReText
        </h1>
        <ModeToggle />
      </nav>
    </div>
  );
};

export default Navbar;
