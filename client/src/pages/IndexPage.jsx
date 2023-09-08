import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  useEffect(() => {
    axios.get("/home").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-14">
      {places.length > 0 &&
        places.map((place) => (
          <div>
            <div className="bg-gray-300 rounded-2xl aspect-square mt-3">
              {place.photos.length > 0 && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <div className="mt-2">
              <h2 className="font-bold truncate">{place.address}</h2>
              <h3 className="text-gray-500 truncate">{place.title}</h3>
              <p className="text-gray-500">{new Date(place.startDate).getDate()} {months[new Date(place.startDate).getMonth()]}
              {" - "}{new Date(place.endDate).getDate()} {months[new Date(place.endDate).getMonth()]}</p>
              <p className="underline mt-1"><span className="font-bold">£{place.price}</span> total</p>
            </div>
          </div>
        ))}
    </div>
  );
}
