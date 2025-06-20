import React from "react";
import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user, logout } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tighter">
              ThinkBoard
            </h1>
          </Link>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
            {user ? (
              <>
                <Link
                  to="/create-note"
                  className="btn btn-primary btn-sm sm:btn-md"
                >
                  <PlusIcon className="size-4 sm:size-5" />
                  <span>Create a Note</span>
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-ghost text-error border border-error hover:bg-error/10 btn-sm sm:btn-md"
                >
                  <LogOutIcon className="size-3 sm:size-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm sm:btn-md">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
