import React from "react";
import { Link } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user, logout } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              ThinkBoard
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link to="/create-note" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>Create a Note</span>
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-ghost text-error border border-error hover:bg-error/10"
                >
                  <LogOutIcon className="size-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
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
