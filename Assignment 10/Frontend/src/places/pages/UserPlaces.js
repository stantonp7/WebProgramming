import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const { isLoading, sendRequest } = useHttpClient();

  //data state
  const [loadPlaces, setLoadPlaces] = useState([]);

  //useEffect does not want a function that returns a promise
  //go against what useEffect expects so modify as follows
  const userId = useParams().userId;
  useEffect(
    () => {
      const fetchUsers = async () => {
        try {
          //this is a GET request so don't need to set HTTP method or headers
          const responseData = await sendRequest(
            `http://localhost:3001/api/places/user/${userId}`
          );
          console.log(responseData);
          setLoadPlaces(responseData.places);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchUsers();
    },
    [sendRequest] //specific sendrequest as a depedency, this is a depedent of useEffect
  );
  return <PlaceList items={loadPlaces} />;
};

export default UserPlaces;
