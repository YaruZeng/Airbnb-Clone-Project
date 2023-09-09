import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import List from "../List";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then(({data}) => {
      setBookings(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length > 0 && bookings.map(booking => (
          <List key={booking._id} places={[booking.place]} checkInDate={booking.checkInDate} checkOutDate={booking.checkOutDate} totalPrice={booking.totalPrice} booking={booking}/>
        ))}
      </div>
    </div>
  );
}
