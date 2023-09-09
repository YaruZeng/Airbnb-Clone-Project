import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PhotoGallery from "../PhotoGallery";
import BookingCard from "../BookingCard";

export default function PlaceDetailPage() {
  const { placeId, bookingId } = useParams();
  const [placeDetail, setPlaceDetail] = useState();
  const [bookingDetail, setBookingDetail] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const months = [
    "Jan","Feb","Mar","Apr",
    "May","Jun","Jul","Aug",
    "Sep","Oct","Nov","Dec",
  ];

  useEffect(() => {
    if (!placeId) {
      return;
    }
    axios.get("/place/" + placeId).then((response) => {
      setPlaceDetail(response.data);
    });

    if (placeId && bookingId) {
      axios.get("/place/" + placeId + "/" + bookingId).then((response) => {
        setBookingDetail(response.data);
      });
      setButtonDisabled(true);
    }
  }, [placeId, bookingId]); // refresh the page if the id changes

  if (!placeDetail) return "";

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

      <BookingCard bookingDetail={bookingDetail}/>
      <PhotoGallery placeDetail={placeDetail} />

      <div className="grid mt-5 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="mt-5 mr-5">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p className="leading-7">{placeDetail.description}</p>
            <div className="my-4 mb-6 leading-7">
              <p>
                Available dates: {new Date(placeDetail.startDate).getDate()}{" "}
                {months[new Date(placeDetail.startDate).getMonth()]}
                {" - "}
                {new Date(placeDetail.endDate).getDate()}{" "}
                {months[new Date(placeDetail.endDate).getMonth()]}
              </p>
              <p>Max number of guests: {placeDetail.maxGuests} </p>
              <p>Check in: {placeDetail.checkIn} </p>
              <p>Check out: {placeDetail.checkOut} </p>
            </div>
            <hr />
          </div>
          <div className="mb-5 mr-3 mt-2">
            <h2 className="text-2xl font-semibold my-2">Extra information</h2>
            <p className="leading-7">{placeDetail.extraInfo}</p>
          </div>
        </div>
        <BookingWidget
          placeDetail={placeDetail}
          buttonDisabled={buttonDisabled}
        />
      </div>
    </div>
  );
}
