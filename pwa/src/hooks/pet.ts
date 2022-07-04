import * as React from "react";
import { useQuery } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const usePet = () => {
  const API: APIService = React.useContext(APIContext);

  const getPets = () =>
    useQuery<any, Error>(["pets"], () => API.Pet.getPets(), {
      onError: (error) => {
        throw new Error(error.message);
      },
    });

  return { getPets };
};
