import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              ThinkBoard
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/create-note" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Create a Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
