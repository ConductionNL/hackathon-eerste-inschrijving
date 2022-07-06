import { AxiosInstance, AxiosResponse } from "axios";
import { Send } from "../apiService";

export default class FirstRegistrationClient {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public createZaak = async ({
  }: any): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", "/api/v1/zaken", {
      "identificatie": "eerste-inschrijving",
      "bronorganisatie": "gemeenteX",
      "omschrijving": "Eerste inschrijving",
      "toelichting": "Verzoek tot eerste inschrijving in gemeente X in Nederland",
      "zaaktype": "http://example-type.com",
      "verantwoordelijkeOrganisatie": "gemeenteX",
      "startdatum": "2022-01-01"
    })

    return result;
  }

  public submitFirstRegistration = async ({
    movingDocument,
    idDocumentInformation: {
      documentType,
      documentNumber,
      documentIssueDate,
      documentExpiryDate,
      documentProvidedBy,
      foreignIdNumber,
    },
    personalInformation: {
      familyName,
      formerFamilyName,
      firstName,
      dateOfBirth,
      placeOfBirth,
      countryOfBirth,
      nationality,
      maritalStatus,
      gender,
      phoneNumber,
      emailAddress,
    }
  }: any): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", "/first-registration", {
      movingDocument,
      idDocumentInformation: {
        documentType,
        documentNumber,
        documentIssueDate,
        documentExpiryDate,
        documentProvidedBy,
        foreignIdNumber,
      },
      personalInformation: {
        familyName,
        formerFamilyName,
        firstName,
        dateOfBirth,
        placeOfBirth,
        countryOfBirth,
        nationality,
        maritalStatus,
        gender,
        phoneNumber,
        emailAddress,
      }
    });
    return result;
  };
}
