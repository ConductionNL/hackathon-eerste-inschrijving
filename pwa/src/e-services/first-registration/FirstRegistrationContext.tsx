import * as React from "react";

export interface IFirstRegistrationData {
  hasLivedInNlBefore: string;
  hasLivedInNlUntil: string;
  untilWhichDateWillYouStayInNl: string;
}

export const defaultFirstRegistrationData = {} as IFirstRegistrationData;

export const FirstRegistrationContext = React.createContext<[IFirstRegistrationData, (data: IFirstRegistrationData) => void]>([
  defaultFirstRegistrationData,
  () => null
]);

export const FirstRegistrationServiceProvider = FirstRegistrationContext.Provider;
