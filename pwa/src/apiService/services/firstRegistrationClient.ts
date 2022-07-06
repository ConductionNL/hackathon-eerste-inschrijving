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

  public createZaakEigenschap = async (zaakId: string, eigenschap: string, waarde: string): Promise<AxiosResponse> => {
    const { data: result } = await Send(this._instance, "POST", `/zaken/${zaakId}/zaakeigenschappen`, {
      "zaak": 'http://localhost/ZAAK/' + zaakId,
      "eigenschap": 'http://localhost/EIGENSCHAP/' + eigenschap,
      "waarde": waarde,
    });

    return result;
  }

  public addZaakDocument = async (zaakId: string, fileList: FileList): Promise<AxiosResponse> => {
    const file2Base64 = (file:File): Promise<string> => {
      return new Promise<string> ((resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
      })
    }

    if (! fileList || ! fileList.item(0)) {
      throw "No document found";
    }

    const fileBase64 = await file2Base64(fileList.item(0) as File);

    const { data: result } = await Send(this._instance, "POST", "/enkelvoudiginformatieobjecten",
      {
        "bronorganisatie": "simproc",
        "creatiedatum": "2022-07-06",
        "titel": "Verhuisdocument",
        "vertrouwelijkheidaanduiding": "zaakvertrouwelijk",
        "auteur": "SIMProcura",
        "taal": "NLD",
        "inhoud": fileBase64, // TODO: add base64 encoded string file content
        "informatieobjecttype": "http://localhost/INFORMARTIEOBJECTYPE/verhuisdocumenttype"
      }
    )
    const { data: result2 } = await Send(this._instance, "POST", "/objectinformatieobjecten",
      {
        "informatieobject": "http://localhost/informatieobject/" + result.id,
        "object": "http://localhost/zaak/" + zaakId,
        "objectType": "zaak"
      }
    )

    return result2;
  }
}
