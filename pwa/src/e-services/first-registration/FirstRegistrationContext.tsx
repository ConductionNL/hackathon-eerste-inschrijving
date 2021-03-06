import * as React from "react";

export interface IFirstRegistrationData {
  hasLivedInNlBefore: string;
  hasLivedInNlUntil: string;
  untilWhichDateWillYouStayInNl: string;
  wereYouRegisteredInNlAntilles: string;
  movingDocument: FileList|undefined;
  idDocumentInformation: {
    documentType: string;
    documentNumber: string;
    documentIssueDate: string;
    documentExpiryDate: string;
    documentProvidedBy: string;
    foreignIdNumber: string;
  };
  personalInformation: {
    familyName: string;
    formerFamilyName: string;
    firstName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    maritalStatus: string;
    gender: string;
    phoneNumber: string;
    emailAddress: string;
  };
  steps: string[];
}

export const defaultFirstRegistrationData = {
  hasLivedInNlBefore: "",
  hasLivedInNlUntil: "",
  untilWhichDateWillYouStayInNl: "",
  wereYouRegisteredInNlAntilles: "",
  movingDocument: undefined,
  idDocumentInformation: {
    documentType: "",
    documentNumber: "",
    documentIssueDate: "",
    documentExpiryDate: "",
    documentProvidedBy: "",
    foreignIdNumber: "",
  },
  personalInformation: {
    familyName: "",
    formerFamilyName: "",
    firstName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    countryOfBirth: "",
    nationality: "",
    maritalStatus: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
  },
  steps: [],
} as IFirstRegistrationData;

export const FirstRegistrationContext = React.createContext<[IFirstRegistrationData, (data: IFirstRegistrationData) => void]>([
  defaultFirstRegistrationData,
  () => null
]);

export const FirstRegistrationServiceProvider = FirstRegistrationContext.Provider;
