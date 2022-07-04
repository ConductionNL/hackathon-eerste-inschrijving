import { AxiosInstance, AxiosResponse } from "axios";
import { Send } from "../apiService";

export default class Pet {
  private _instance: AxiosInstance;

  constructor(_instance: AxiosInstance) {
    this._instance = _instance;
  }

  public getPets = async (): Promise<AxiosResponse> => {
    const { data } = await Send(this._instance, "GET", "/pet");
    return data;
  };
}
