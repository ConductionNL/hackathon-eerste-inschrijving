import * as React from "react";
import { useMutation } from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useFirstRegistrationClient = () => {
  const API: APIService = React.useContext(APIContext);

  const createZaak = ({ }: any, { onSuccess }: any) =>
    useMutation<any, Error>(["first-registration"], () => API.FirstRegistrationClient.createZaak({}), {
      onError: (error) => {
        throw new Error(error.message);
      },
      onSuccess,
    }
    );

  const createZaakEigenschap = ({}: any, { onSuccess }: any) =>
    useMutation<any, Error>(["first-registration"], ({ zaakId, eigenschap, waarde, }: any) => API.FirstRegistrationClient.createZaakEigenschap(zaakId, eigenschap, waarde), {
      onError: (error) => {
        throw new Error(error.message);
      },
      onSuccess,
    });

  const createZaakDocument = ({ }: any, { onSuccess, onError }: any) =>
    useMutation<any, Error>(["first-registration-enkelvoudig-informatie-object"], ({ zaakId, fileList }: any) => API.FirstRegistrationClient.addZaakDocument(zaakId, fileList), {
      onError: (error) => {
        onError();

        throw new Error(error.message);
      },
      onSuccess,
    });

  return { createZaak, createZaakDocument, createZaakEigenschap };
};
