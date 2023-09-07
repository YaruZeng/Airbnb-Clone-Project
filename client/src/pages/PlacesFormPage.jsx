import { useState } from "react";
import PerkSelections from "./PerkSelections";
import PhotoUploader from "../PhotoUploader";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";

export default function PlacesFormPage() {

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

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

  async function addNewPlace(event) {
    event.preventDefault();
    try {
      await axios.post("/places", {
        title, address, photos: addedPhotos,
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests,
      });
      setRedirect(true);
    } catch (error) {
      alert("Submit failed, please try again later.");
    }
  };

  if (redirect) {
    return <Navigate to="/account/places"/>
  }

  return (
    <div>
    <AccountNav />
    <form onSubmit={addNewPlace}>
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
      <div className="grid gap-2 sm:grid-cols-3">
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
          <h3 className="mt-2 -mb-1">Max number of guests</h3>
          <input
            type="number"
            placeholder="4"
            value={maxGuests}
            onChange={(event) => setMaxGuests(event.target.value)}
          />
        </div>
      </div>
      <button className="primary my-5">
        Save
      </button>
    </form>
  </div>
  );
}