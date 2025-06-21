import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        // console.log("Fetched note data:", res.data);
        setNote(res.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch the note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  const handleSave = async () => {
    const trimmedTitle = note.title?.trim();
    const trimmedContent = note.content?.trim();

    if (!trimmedTitle || !trimmedContent) {
      toast.error("Please enter a title and content.");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: trimmedTitle,
        content: trimmedContent,
      });
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field) => (e) => {
    setNote((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-lg rounded-2xl p-8">
        <Link
          to="/"
          className="text-pink-600 font-semibold flex items-center gap-2 hover:underline mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Notes
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">Edit Note</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Title
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Enter the note title..."
              value={note.title}
              disabled={saving}
              onChange={handleChange("title")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Content
            </label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[150px] focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Enter the note content..."
              value={note.content}
              disabled={saving}
              onChange={handleChange("content")}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              className="btn btn-outline btn-error"
              onClick={() => setShowModal(true)}
              disabled={saving || deleting}
            >
              <Trash2Icon className="h-5 w-5 mr-1" />
              Delete Note
            </button>

            <button
              className="btn text-white bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="animate-spin h-5 w-5" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
                disabled={deleting}
              >
                No, Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-md text-white transition ${
                  deleting
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-500"
                }`}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetailPage;
