import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {}
  };
  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connecitons found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-3xl text-white text-bold">Connections</h1>
      {connections.map((connection) => {
        console.log(connection);
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            className="flex  m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto text-center"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
