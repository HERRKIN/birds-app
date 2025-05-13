import { useQuery } from "@apollo/client";
import { GET_BIRD, Bird, Note } from "../lib/queries-and-mutations/birds";
import { Breadcrumbs } from "../components/breadcrumbs";
import { useParams } from "react-router-dom";
import { BirdImage } from "../components/bird-image";
import { useRef } from "react";
import { AddNoteForm } from "../components/add-note-form";
import { Loader } from "../components/loader";

export const BirdPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { id } = useParams();
  const { data, loading, error } = useQuery<{ bird: Bird }>(GET_BIRD, {
    variables: {
      id,
    },
  });

  const bird = data?.bird;

  return (
    <>
      {loading && <Loader />}
      <Breadcrumbs
        crumbs={loading && !bird ? [""] : ["Birds", bird?.english_name || ""]}
        rightComponent={
          <button
            className="text-blue-950  px-4 py-2 rounded-lg text-sm border border-gray-500/30 shadow-sm cursor-pointer hover:bg-gray-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              dialogRef.current?.showModal();
            }}
            disabled={loading}
          >
            Add Note
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {error && <div>Error: {error.message}</div>}
        {bird && (
          <>
            <div className="flex flex-col gap-4 max-w-[300px] ">
              <BirdImage src={bird.image_url} alt={bird.english_name} />
            </div>

            <section className="flex flex-col gap-2 w-full max-w-[1000px]">
              <h3 className="text-lg font-bold">Names</h3>
              <hr className="border-gray-200 mb-2" />
              <table className="w-full   table-fixed">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-normal text-slate-500">
                      English
                    </th>
                    <th className="text-left text-sm font-normal text-slate-500">
                      Latin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left text-sm font-normal ">
                      {bird?.english_name}
                    </td>
                    <td className="text-left text-sm font-normal ">
                      {bird?.latin_name}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">Notes</h3>
              {bird.notes.length === 0 && (
                <span className="text-sm text-gray-500">No notes yet</span>
              )}
              {bird.notes.map((note: Note) => (
                <article key={note.id} className="flex  gap-2">
                  <div className="w-10 h-10 ">
                    <BirdImage
                      src={bird.thumb_url}
                      alt={bird.english_name}
                      className="aspect-square"
                      loadingText="..."
                    />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 capitalize">
                      {note.comment}
                    </span>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
      <dialog
        ref={dialogRef}
        onClose={() => dialogRef.current?.close()}
        className="rounded-lg m-auto relative"
        aria-modal="true"
        aria-labelledby="add-note-form-title"
        aria-describedby="add-note-form-description"
      >
        <AddNoteForm
          onCancel={() => dialogRef.current?.close()}
          birdId={id || ""}
        />
      </dialog>
    </>
  );
};
