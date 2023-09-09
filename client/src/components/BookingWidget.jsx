import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({ placeDetail, buttonDisabled }) {
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [redirect, setRedirect] = useState();
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setGuestName(user.name);
    }
  }, [user]);

  let nights = 0;

  if (checkInDate && checkOutDate) { // calculate num of nights
    nights = differenceInCalendarDays(
      new Date(checkOutDate),
      new Date(checkInDate)
    );
  }

  async function handleReserve(event) {
    event.preventDefault();
    const response = await axios.post("/bookings", {place: placeDetail._id, checkInDate, 
      checkOutDate, numOfGuests, guestName, guestPhone, totalPrice: placeDetail.price * nights});

    // const userId = response.data.user;
    // console.log(userId);
    setRedirect("/account/bookings");
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <form onSubmit={(event) => handleReserve(event)}>
      <div className="bg-white p-5 rounded-xl border shadow-md">
        <div className="text-left pb-1">
          <span className="font-bold text-2xl">£{placeDetail.price}</span> per
          night
        </div>
        <div className="my-2 border rounded-xl">
          <div className="flex border-b">
            <div className="px-3 py-4 w-1/2">
              <label>Check in: </label>
              <input
                type="date"
                className="cursor-pointer"
                value={checkInDate}
                onChange={(event) => setCheckInDate(event.target.value)}
              />
            </div>
            <div className="px-3 py-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                className="cursor-pointer"
                value={checkOutDate}
                onChange={(event) => setCheckOutDate(event.target.value)}
              />
            </div>
          </div>
          <div className="px-3 py-4 border-b">
            <label>Number of guests</label>
            <input
              type="number"
              value={numOfGuests}
              onChange={(event) => setNumOfGuests(event.target.value)}
              placeholder="1"
            />
          </div>
          <div className="px-3 py-4">
            <label>Your full name</label>
            <input
              type="text"
              value={guestName}
              onChange={(event) => setGuestName(event.target.value)}
              placeholder="Jane Doe"
            />
            <label>Phone number</label>
            <input
              type="text"
              value={guestPhone}
              onChange={(event) => setGuestPhone(event.target.value)}
              placeholder="+44012345678910"
            />
          </div>
          {nights > 0 && (
            <div>
              <div className="border-b border-t">
                <div className="flex px-3 py-4 justify-between items-center text-gray-600">
                  <p className="underline">
                    £{placeDetail.price} x {nights} nights{" "}
                  </p>
                  <p className="">£{placeDetail.price * nights}</p>
                </div>
                <div className="flex px-3 pb-4 justify-between items-center text-gray-600">
                  <p className="underline">Service fee</p>
                  <p className="">£{nights && "100"}</p>
                </div>
              </div>
              <div>
                <div className="flex px-3 py-4 justify-between items-center">
                  <p className="underline">Total</p>
                  <p className="">
                    £{nights && placeDetail.price * nights + 100}
                  </p>
                </div>
              </div>
            </div>)}
          </div>
        <button type="submit" className={buttonDisabled ? "normal" : "primary"} disabled={buttonDisabled}>{buttonDisabled ? "You've already booked" : "Reserve"}</button>
      </div>
    </form>
  );
}
