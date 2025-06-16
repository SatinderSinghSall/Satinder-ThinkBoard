import { NotebookIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-gradient-to-tr from-purple-500/10 to-blue-500/10 p-8 rounded-full shadow-md">
        <NotebookIcon className="w-12 h-12 text-primary" />
      </div>

      <h3 className="mt-6 text-3xl font-semibold text-white">No notes yet</h3>
      <p className="mt-2 text-lg text-gray-400 max-w-md">
        You're all set to start your journey. Click below to create your first
        note and start organizing your thoughts.
      </p>

      <Link
        to="/create-note"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary text-white hover:bg-primary/90 px-6 py-3 font-medium transition-all shadow-lg"
      >
        <PlusIcon className="w-5 h-5" />
        <span>Create Your First Note</span>
      </Link>
    </div>
  );
};

export default NotesNotFound;
