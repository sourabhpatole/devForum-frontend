import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequests = async (status, _id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };
  console.log(requests);
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="flex justify-center my-10">No Requests found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-white text-bold">Connections</h1>
      {requests.map((request) => {
        console.log(request);
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            className="flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto text-center"
            key={_id}
          >
            <div className="">
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div className="">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
