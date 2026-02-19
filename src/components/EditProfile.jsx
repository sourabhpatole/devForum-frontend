import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          about,
          age,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      error.message;
    }
  };
  const genderOptions = [
    { value: "", label: "Please select one…" },
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "non-binary", label: "Non-Binary" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-answer", label: "Prefer not to answer" },
  ];
  return (
    <>
      <div className="flex my-10 justify-center">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoUrl}
                    placeholder=""
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    placeholder=""
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <textarea
                    className="textarea h-24"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </div>
              {/* <p className="text-red-500">{error}</p> */}
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, gender, about, age }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
