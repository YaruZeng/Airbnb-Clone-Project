import { useState } from "react";
import axios from "axios";

export default function PhotoUploader({addedPhotos, setAddedPhotos}) {

  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(event) {
    event.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    } catch (e) {
      alert("Upload failed, please try again later.");
    }
    setPhotoLink("");
  }

  async function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData(); // to store upload files
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    };
    await axios.post("/upload", data, {
      headers: {"Content-Type": "multipart/form-data"}
    }).then(response => {
      const {data: filenames} = response;
      setAddedPhotos((prev) => {
        return [...prev, ...filenames];
      });
    })
  }

  return (
    <div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add using a link ....jpg"
          value={photoLink}
          onChange={(event) => setPhotoLink(event.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-primary text-white rounded-2xl w-40 h-11"
        >
          Add photo
        </button>
      </div>
      <div className="gap-2 mt-2 grid grid-cols-3 md:grid-cols-4 lg-grid-col">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
              />
            </div>
          ))}
        <label className="h-32 flex items-center gap-1 justify-center border rounded-xl p-8 text-xl text-gray-700 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          <span>Upload</span>
        </label>
      </div>
    </div>
  );
}
