import { useEffect, useState } from "react";
import PerkSelections from "./PerkSelections";
import PhotoUploader from "../components/PhotoUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState();
  const [price, setPrice] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => { // display data entered before by user 
    if (!id) {
      return;
    } else {
      axios.get("/place/" + id).then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setAddedPhotos(data.photos);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setPrice(data.price),
        setStartDate(data.startDate.split("T")[0]);
        setEndDate(data.endDate.split("T")[0]);
      });
    }
  }, [id]); // reactive values referenced inside of the above setup code

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  async function savePlace(event) {
    event.preventDefault();
    if (startDate > endDate) {
      return alert("End date must be later than Start date. ");
    };
    const placeData = {
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      startDate,
      endDate
    };
    console.log("start date: " + startDate);
    try {
      if (id) {
        //update
        await axios.put("/places", {
          id,
          ...placeData,
        });
      } else {
        //create a new place
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      alert("Submit failed, please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to="/account/user-places" />;
  }

  return (
    <div>
      <form onSubmit={savePlace} className="px-14">
        {preInput(
          "Title",
          "title for your apartment. It's better to have a short and catchy title as in an advertisement."
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apartment"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {preInput("Address", "address of this place. ")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        {preInput("Photos", "more is better. ")}
        <PhotoUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {preInput("Description", "description of the place. ")}
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {preInput("Perks", "select all the perks of your place.")}
        <PerkSelections selectedPerks={perks} setPerks={setPerks} />
        {preInput("Extra info", "house rules, etc. ")}
        <textarea
          value={extraInfo}
          onChange={(event) => setExtraInfo(event.target.value)}
        />
        {preInput(
          "Checkin & Checkout times",
          "add checkin and checkout times, remember to have some time for cleaning the room between guests."
        )}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Start date</h3>
            <input
              className="w-full border my-2 py-2 px-3 rounded-2xl"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">End date</h3>
            <input
              className="w-full border my-2 py-2 px-3 rounded-2xl"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="15"
              value={checkIn}
              onChange={(event) => setCheckIn(event.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="11"
              value={checkOut}
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night (pounds)</h3>
            <input
              type="number"
              placeholder="100"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              placeholder="4"
              value={maxGuests}
              onChange={(event) => setMaxGuests(event.target.value)}
            />
          </div>
        </div>
        <button className="primary my-5">Save</button>
      </form>
    </div>
  );
}
