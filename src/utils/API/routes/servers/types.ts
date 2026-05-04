export interface UpdateStateRequest {
  tps: number;
  players: Profile[];
}
export interface Profile {
  username: string;
}

export interface SelfResponse {
  id: number;
}
