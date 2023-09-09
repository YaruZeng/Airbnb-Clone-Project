import { differenceInCalendarDays } from "date-fns";
import DateDuration from "./DateDuration";

export default function BookingCard({bookingDetail}) {
  return (
    <div>
      {bookingDetail && (
        <div className="bg-gray-200 rounded-3xl p-3 mb-5 flex justify-between">
          <div className="my-3 mx-5">
            <h2 className="text-lg mb-10">Your booking information: </h2>
            <div className="mt-5">
              <div className="-mt-7 flex gap-3">
                <div className="flex gap-1">
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
                      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                  </svg>
                  {differenceInCalendarDays(
                    new Date(bookingDetail.checkOutDate),
                    new Date(bookingDetail.checkInDate)
                  )}{" "}
                  nights:
                </div>
                <DateDuration
                  checkInDate={bookingDetail.checkInDate}
                  checkOutDate={bookingDetail.checkOutDate}
                />
              </div>
              <p className="flex gap-1 mt-1">
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
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
                Order number: {bookingDetail._id}
              </p>
            </div>
          </div>
          <div className="bg-primary w-30 h-30 mr-2 rounded-2xl text-white px-8 py-6 text-center">
            <p>Total price</p>
            <div className="text-2xl">£{bookingDetail.totalPrice}</div>
          </div>
        </div>
      )}
    </div>
  );
}
