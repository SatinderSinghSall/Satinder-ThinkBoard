import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import api from "../lib/axios";

import RateLimited from "../components/RateLimited";
import NoteCard from "../components/NoteCard";
import NoNotesFound from "../components/NoNotesFound";
import NoteCardSkeleton from "../components/NoteCardSkeleton";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        // console.log(response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log(`Error Fetching Notes: ${error}`);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="">
      {isRateLimited && <RateLimited />}

      <div className="max-w-7xl mx-auto px-4 mt-6 mb-6">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NoNotesFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
