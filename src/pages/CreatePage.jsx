import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Enter all the fields.");
      return;
    }

    setLoading(true);
    try {
      const request = await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log(`Error while submitting data: ${error}`);
      if (error.response.status === 429) {
        toast.error("Too many request, try again later.", {
          duration: 5000,
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to create note!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-base-100 rounded-2xl shadow-lg p-8">
        <Link
          to="/"
          className="flex items-center text-sm text-secondary mb-6 hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Notes
        </Link>

        <h2 className="text-3xl font-bold text-primary mb-6">
          Create New Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="label mb-1 text-base font-medium text-base-content">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter the note title..."
              className="input input-bordered w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="label mb-1 text-base font-medium text-base-content">
              Content
            </label>
            <textarea
              placeholder="Enter the note content..."
              className="textarea textarea-bordered w-full min-h-[120px]"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-secondary btn-wide transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create a Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
