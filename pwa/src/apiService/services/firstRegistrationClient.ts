import { AxiosInstance, AxiosResponse } from "axios";
import { Send } from "../apiService";

export default class FirstRegistrationClient {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public submitFirstRegistration = async ({
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
  }: any): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", "/first-registration", {
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
    });
    return result;
  };
}
