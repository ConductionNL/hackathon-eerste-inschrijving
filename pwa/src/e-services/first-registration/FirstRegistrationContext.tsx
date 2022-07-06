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
  hasLivedInNlBefore: "0",
  hasLivedInNlUntil: "",
  untilWhichDateWillYouStayInNl: "2024-06-02",
  wereYouRegisteredInNlAntilles: "0",
  movingDocument: undefined,
  idDocumentInformation: {
    documentType: "passport",
    documentNumber: "123",
    documentIssueDate: "2021-02-02",
    documentExpiryDate: "2024-06-02",
    documentProvidedBy: "someone",
    foreignIdNumber: "123",
  },
  personalInformation: {
    familyName: "de Heer",
    formerFamilyName: "none",
    firstName: "Sven",
    dateOfBirth: "18-04-1991",
    placeOfBirth: "Den Haag",
    countryOfBirth: "Nederland",
    nationality: "NLD",
    maritalStatus: "unmarried",
    gender: "male",
    phoneNumber: "06-123556768",
    emailAddress: "s.deheer@simgroep.nl",
  },
  steps: [],
} as IFirstRegistrationData;
// export const defaultFirstRegistrationData = {
//   hasLivedInNlBefore: "",
//   hasLivedInNlUntil: "",
//   untilWhichDateWillYouStayInNl: "",
//   wereYouRegisteredInNlAntilles: "",
//   movingDocument: undefined,
//   idDocumentInformation: {
//     documentType: "",
//     documentNumber: "",
//     documentIssueDate: "",
//     documentExpiryDate: "",
//     documentProvidedBy: "",
//     foreignIdNumber: "",
//   },
//   personalInformation: {
//     familyName: "",
//     formerFamilyName: "",
//     firstName: "",
//     dateOfBirth: "",
//     placeOfBirth: "",
//     countryOfBirth: "",
//     nationality: "",
//     maritalStatus: "",
//     gender: "",
//     phoneNumber: "",
//     emailAddress: "",
//   },
//   steps: [],
// } as IFirstRegistrationData;

export const FirstRegistrationContext = React.createContext<[IFirstRegistrationData, (data: IFirstRegistrationData) => void]>([
  defaultFirstRegistrationData,
  () => null
]);

export const FirstRegistrationServiceProvider = FirstRegistrationContext.Provider;
