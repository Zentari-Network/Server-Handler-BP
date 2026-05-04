import APIHandler from "../../handler";
import type { APIResponse, GeneralResponse } from "../../types";
import type { SelfResponse, UpdateStateRequest } from "./types";

const ServersRoute = {
  UpdateState: (
    id: number,
    body: UpdateStateRequest,
  ): Promise<APIResponse<GeneralResponse>> =>
    APIHandler.Post<GeneralResponse>(`/servers/states/${id}`, body),

  GetSelf: (): Promise<APIResponse<SelfResponse>> =>
    APIHandler.Get<SelfResponse>("/servers/self"),
};

export default ServersRoute;
