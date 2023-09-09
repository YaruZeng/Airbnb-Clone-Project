import { useState } from "react";

export default function PhotoGallery({placeDetail}) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      // take the whole screen, absolute: make the screen scrollable
      <div className="bg-black absolute inset-0 min-h-screen">
        <div className="bg-black p-9 grid gap-5">
          <div className="flex-inline">
            <h2 className="text-white text-2xl mr-6">
              Photos of {placeDetail.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex fixed right-12 top-9 cursor-pointer gap-1 py-1 px-2 items-center rounded-xl bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {placeDetail.photos.length > 0 &&
            placeDetail.photos.map((photo) => (
              <div className="" key={photo}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid md:grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
    <div>
      {placeDetail.photos.length > 0 && (
        <img
          onClick={() => setShowAllPhotos(true)}
          className="aspect-square object-cover cursor-pointer"
          src={"http://localhost:4000/uploads/" + placeDetail.photos[0]}
        />
      )}
    </div>
    <div className="grid">
      <div>
        {placeDetail.photos.length > 1 && (
          <img
            onClick={() => setShowAllPhotos(true)}
            className="aspect-square object-cover cursor-pointer"
            src={"http://localhost:4000/uploads/" + placeDetail.photos[1]}
          />
        )}
      </div>
      {/* overflow-hidden relative top-2: train the image so that the bottom line is even */}
      <div className="overflow-hidden">
        {placeDetail.photos.length > 2 && (
          <img
            onClick={() => setShowAllPhotos(true)}
            className="aspect-square object-cover relative top-2 cursor-pointer"
            src={"http://localhost:4000/uploads/" + placeDetail.photos[2]}
          />
        )}
      </div>
    </div>
    <button
      className="flex gap-2 absolute bottom-4 right-4 py-1 px-2 bg-white shadow-sm shadow-gray-400 rounded-xl"
      onClick={() => setShowAllPhotos(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
        />
      </svg>
      Show all photos
    </button>
  </div>
  )
}