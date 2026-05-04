import {
  http,
  HttpHeader,
  HttpRequest,
  HttpRequestMethod,
} from "@minecraft/server-net";
import APIConfig from "../../lib/API";
import type { APIResponse } from "./types";

export default abstract class APIHandler {
  public static async Get<T>(route: string): Promise<APIResponse<T>> {
    const payload = new HttpRequest(APIConfig.Endpoint + route);

    //@ts-expect-error | Mojang sucks
    payload.setMethod(HttpRequestMethod.Get);
    payload.setHeaders([
      new HttpHeader("Authorization", APIConfig.APISecret),
      new HttpHeader("Content-Type", "application/json"),
    ]);

    try {
      const response = await http.request(payload);
      const body = JSON.parse(response.body) as T;

      return {
        data: body,
        route,
        status: response.status,
      };
    } catch {
      return {
        data: {} as T,
        route,
        status: 500,
      };
    }
  }
  public static async Post<T>(
    route: string,
    body?: object,
  ): Promise<APIResponse<T>> {
    const payload = new HttpRequest(APIConfig.Endpoint + route);

    //@ts-expect-error | Mojang sucks
    payload.setMethod(HttpRequestMethod.Post);
    payload.setBody(JSON.stringify(body ?? {}));
    payload.setHeaders([
      new HttpHeader("Authorization", APIConfig.APISecret),
      new HttpHeader("Content-Type", "application/json"),
    ]);

    try {
      const response = await http.request(payload);
      const body = JSON.parse(response.body) as T;

      return {
        data: body,
        route,
        status: response.status,
      };
    } catch {
      return {
        data: {} as T,
        route,
        status: 500,
      };
    }
  }
}
