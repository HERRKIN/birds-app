import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ADD_NOTE, GET_BIRD } from "../lib/queries-and-mutations/birds";
import { Loader } from "./loader";

export const AddNoteForm = ({
  onCancel,
  birdId,
}: {
  onCancel: () => void;
  birdId: string;
}) => {
  const [note, setNote] = useState("");
  const isValid = note.length > 0;
  const [noteError, setNoteError] = useState<string | null>(null);
  const [addNote, { loading: addNoteLoading, error: addNoteError }] =
    useMutation(ADD_NOTE);
  const cancel = () => {
    setNote("");
    onCancel();
  };
  const save = async () => {
    try {
      await addNote({
        variables: {
          birdId: birdId,
          comment: note,
          timestamp: Math.floor(Math.random() * 1000000000),
        },
        refetchQueries: [
          {
            query: GET_BIRD,
            variables: {
              id: birdId,
            },
          },
        ],
      });
      cancel();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (addNoteError) {
      setNoteError(addNoteError.message);
      setTimeout(() => {
        setNote("");
        setNoteError(null);
      }, 3000);
    }
  }, [addNoteError]);

  return (
    <div className="relative min-w-[400px] bg-white rounded-lg ">
      {addNoteLoading && <Loader />}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center p-4 border-b border-gray-300">
          <h1 className="text-sm  ">Add Note</h1>
          <button className="p-0 m-0 cursor-pointer text-lg" onClick={cancel}>
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <label className="text-sm" htmlFor="note">
            Note
          </label>
          <textarea
            disabled={addNoteLoading}
            placeholder="Enter your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            id="note"
            className="border border-gray-300 rounded-md p-2 bg-slate-500/20 focus:bg-white transition-colors placeholder:text-sm"
          />
        </div>
        <div className="flex flex-row  border-t border-gray-300 p-4 justify-between">
          <div className="flex flex-row justify-center items-center">
            {noteError && (
              <div className="text-red-500 text-xs">Error: {noteError}</div>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="text-blue-950  text-bold px-4 py-2 rounded-lg text-sm border border-gray-500/30 shadow-sm cursor-pointer hover:bg-gray-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                cancel();
              }}
              disabled={addNoteLoading}
            >
              Cancel
            </button>
            <button
              disabled={!isValid || addNoteLoading}
              onClick={() => void save()}
              className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {addNoteLoading ? "Adding..." : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
