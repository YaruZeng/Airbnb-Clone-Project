import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlaceDetailPage() {
  const { id } = useParams();
  const [placeDetail, setPlaceDetail] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/place/" + id).then((response) => {
      setPlaceDetail(response.data);
    });
  }, [id]); // refresh the page if the id changes

  if (!placeDetail) return "";

  if (showAllPhotos) {
    return (
      // take the whole screen, absolute: make the screen scrollable
      <div className="bg-black absolute inset-0 min-h-screen">
        <div className="bg-black p-9 grid gap-5">
          <div className="flex-inline">
            <h2 className="text-white text-2xl mr-40">
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
    <div className="mx-14 -mt-4">
      <h1 className="text-2xl mb-2 font-bold">{placeDetail.title}</h1>
      {/* target="_blank": open in a new window */}
      <a
        className="flex gap-1 font-semibold underline items-center mb-4"
        target="_blank"
        href={"http://maps.google.com/?q=" + placeDetail.address}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        {placeDetail.address}
      </a>
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

      <div className="grid mt-5 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-5 mr-5">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="leading-7">{placeDetail.description}</p>
            <p className="my-3 mb-6 leading-7">
              Check in: {placeDetail.checkIn} <br />
              Check out: {placeDetail.checkOut} <br />
              Max number of guests: {placeDetail.maxGuests}
            </p>
            <hr/>
          </div>
          <div className="mb-5 mr-3 mt-2">
            <h2 className="text-2xl font-semibold my-2">Extra information</h2>
            <p className="leading-7">{placeDetail.extraInfo}</p>
          </div>
        </div>
        <BookingWidget placeDetail={placeDetail} />
      </div>
    </div>
  );
}
