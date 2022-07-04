import * as React from "react";
import {useMutation} from "react-query";
import APIService from "../apiService/apiService";
import APIContext from "../apiService/apiContext";

export const useFirstRegistration = () => {
  const API: APIService = React.useContext(APIContext);

  const submitFirstRegistration = ({
     documentType,
     documentIssueDate,
     documentExpiryDate,
     issueByInstancy,
     foreignPersonalId,
     surname,
     previousSurname,
     firstname,
     dateOfBirth,
     birthplace,
     countryOfBirth,
     nationality,
     maritalStatus,
     gender,
     phoneNumber,
     emailAddress,
   }: any, {onSuccess}: any) =>
    useMutation<any, Error>(["first-registration"], () => API.FirstRegistrationClient.submitFirstRegistration({
      documentType,
      documentIssueDate,
      documentExpiryDate,
      issueByInstancy,
      foreignPersonalId,
      surname,
      previousSurname,
      firstname,
      dateOfBirth,
      birthplace,
      countryOfBirth,
      nationality,
      maritalStatus,
      gender,
      phoneNumber,
      emailAddress,
    }), {
      onError: (error) => {
        throw new Error(error.message);
      },
      onSuccess,
    });

  return { submitFirstRegistration };
};
