import { useState } from "react";

export default function BookingWidget({ placeDetail }) {
  const [numOfGuests, setNumOfGuests] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function calculateNights(event) {
    const startDate = new Date(checkInDate);
    const endDate = new Date(event.target.value);
    const one_day = 1000 * 60 * 60 * 24;

    let result = Math.ceil((endDate.getTime() - startDate.getTime()) / one_day);

    if (result <= 0) {
      setNights(0);
      return alert("Check out date should be later than check in date. ");
    } else {
      setCheckOutDate(event.target.value);
      setNights(result);
      setTotalPrice((placeDetail.price * result));
    }
  }

  return (
    <div>
      <div className="bg-white p-5 rounded-xl border shadow-md">
        <div className="text-left pb-1">
          <span className="font-bold text-2xl">£{placeDetail.price}</span> per night
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
                onChange={(event) => calculateNights(event)}
              />
            </div>
          </div>
          <div className="px-3 py-4 border-b">
            <label>Number of guests</label>
            <input
              type="number"
              value={numOfGuests}
              onChange={(event) => setNumOfGuests(event.target.value)}
            />
          </div>
          <div className="border-b">
            <div className="flex px-3 py-4 justify-between items-center text-gray-600">
              <p className="underline">
                £{placeDetail.price} x {nights} nights{" "}
              </p>
              <p className="">£{totalPrice}</p>
            </div>
            <div className="flex px-3 pb-4 justify-between items-center text-gray-600">
              <p className="underline">Service fee</p>
              <p className="">£100</p>
            </div>
          </div>
          <div>
            <div className="flex px-3 py-4 justify-between items-center">
              <p className="underline">Total</p>
              <p className="">£{totalPrice + 100}</p>
            </div>
          </div>
        </div>
        <button className="primary">Reserve</button>
      </div>
    </div>
  );
}
