import { AxiosInstance, AxiosResponse } from "axios";
import { Send } from "../apiService";

export default class FirstRegistrationClient {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public createZaak = async ({}: any): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", "/zaken", {
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

  public createZaakEigenschap = async (zaakId: string, zaak: string, waarde: string): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", `/zaken/${zaakId}/zaakeigenschappen`, {
      "zaak": zaak,
      "eigenschap": 'http://eigenschap.com',
      "waarde": waarde,
    })

    return result;
  }
}
