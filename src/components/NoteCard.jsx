import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PenSquareIcon, Trash2Icon, UserCircle2 } from "lucide-react";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

function NoteCard({ note, setNotes }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const confirmDelete = (e, id) => {
    e.preventDefault();
    setPendingDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/notes/${pendingDeleteId}`);
      setNotes((prev) => prev.filter((note) => note._id !== pendingDeleteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error while deleting note!", error);
      toast.error("Unable to delete note!");
    } finally {
      setLoading(false);
      setShowModal(false);
      setPendingDeleteId(null);
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    navigate(`/detail-note/${id}`);
  };

  return (
    <>
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
            <span className="text-xs text-gray-400 flex items-center gap-2">
              <span>{formatDate(new Date(note.createdAt))}</span>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1 text-white/80">
                <UserCircle2 className="size-4 text-[#00FF9D]" />
                <span className="font-semibold text-[#00FF9D]">
                  {note.noteBy?.name || "Unknown User"}
                </span>
              </div>
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
                onClick={(e) => confirmDelete(e, note._id)}
              >
                <Trash2Icon className="size-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#1F1F1F] p-6 rounded-xl w-full max-w-md shadow-xl border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white transition ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;
