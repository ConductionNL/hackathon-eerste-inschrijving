import * as React from "react";
import {useMutation} from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useFirstRegistrationClient = () => {
  const API: APIService = React.useContext(APIContext);

  const createZaak = ({}: any, {onSuccess}: any) =>
    useMutation<any, Error>(["first-registration"], () => API.FirstRegistrationClient.createZaak({}), {
      onError: (error) => {
        throw new Error(error.message);
      },
      onSuccess,
    }
  );

  const createZaakEigenschap =  (zaakId: string, zaak: string, waarde: string, {onSuccess}: any) =>
    useMutation<any, Error>(["first-registration"], () => API.FirstRegistrationClient.createZaakEigenschap(zaakId, zaak, waarde), {
      onError: (error) => {
        throw new Error(error.message);
      },
      onSuccess,
    }
  );

  return { createZaak, createZaakEigenschap };
};
