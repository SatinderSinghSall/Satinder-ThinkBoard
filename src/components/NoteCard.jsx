import React from "react";
import { Link, useNavigate } from "react-router";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

function NoteCard({ note, setNotes }) {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log(`Error while deleting note!`);
      toast.error("Unable to delete note!");
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    toast.error("Under development!");
    navigate();
  };

  return (
    <Link
      to={`/detail-note/${note._id}`}
      className="group block rounded-2xl bg-[#1F1F1F] transition-transform transform hover:-translate-y-1 hover:shadow-xl 
      border-t-4 border-[#00FF9D] ring-1 ring-base-300"
    >
      <div className="p-5 space-y-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-[#00FF9D] transition-colors line-clamp-1">
          {note.title}
        </h3>

        <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
          {note.content}
        </p>

        <div className="flex justify-between items-center pt-4 border-t border-base-300">
          <span className="text-xs text-gray-500">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-3">
            <button
              className="hover:bg-gray-800 p-2 rounded-full transition-colors"
              title="Edit"
              onClick={(e) => handleEdit(e, note._id)}
            >
              <PenSquareIcon className="size-4 text-[#00FF9D]" />
            </button>
            <button
              className="hover:bg-gray-800 p-2 rounded-full transition-colors"
              title="Delete"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
