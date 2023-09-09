import { Link, useLocation } from "react-router-dom";
import DateDuration from "./DateDuration";

export default function List(props) {
  const { pathname } = useLocation(); // /account/:subpage
  let subpage = pathname.split("/")?.[2];

  return (
    <div className="mt-4 px-14">
      {props.places.length > 0 &&
        props.places.map((place) => (
          <Link
            to={
              subpage == "user-places"
                ? "http://localhost:5173/account/places/" + place._id
                : "http://localhost:5173/place/" +
                  place._id +
                  "/" +
                  props.booking._id
            }
            key={place._id}
            className="flex gap-4 py-4 px-5 m-4 mt-7 bg-gray-100 rounded-2xl cursor-pointer"
          >
            <div className="flex w-32 h-32 bg-gray-200">
              {place.photos.length > 0 && (
                <img
                  className="flex object-cover with-auto"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="grow">
              <h2 className="text-xl -mt-1">{place.title.substring(0, 50)}</h2>
              <p className="flex items-center mt-1">
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
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {place.address.substring(0, 50)}
              </p>

              <div className={subpage == "bookings" ? "mt-7" : "mt-12"}>
                <DateDuration
                  checkInDate={props.checkInDate}
                  checkOutDate={props.checkOutDate}
                />

                <div className="gap-2 flex justify-between items-center">
                  <div className="flex mt-1">
                    <p className="flex gap-1 items-center mr-2">
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
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                      Check in: {place.checkIn}
                    </p>
                    <p className="flex gap-1 items-center">
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
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Check out: {place.checkOut}
                    </p>
                  </div>
                  <div className="text-right">
                    {props.totalPrice && (
                      <div className="underline flex gap-1 items-center">
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
                            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                          />
                        </svg>
                        Total price: £{props.totalPrice}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
